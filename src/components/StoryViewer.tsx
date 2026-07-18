import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Lock, ArrowRight, Sparkles } from 'lucide-react';
import CustomizerScreen from './CustomizerScreen';
import type { StoryFrame } from '../types';

interface StoryViewerProps {
	frames: StoryFrame[];
	password: string;
	videoUrl: string;
}

export default function StoryViewer({ frames, password, videoUrl }: StoryViewerProps) {
	const [frameIndex, setFrameIndex] = useState(0);
	const [stage, setStage] = useState<'chapters' | 'password' | 'final'>('chapters');
	const [entry, setEntry] = useState('');
	const [error, setError] = useState('');

	const frame = frames[frameIndex];

	const enterPassword = () => {
		if (entry.trim().toLowerCase() === password.toLowerCase()) {
			setError('');
			setStage('final');
			return;
		}

		setError("That's not our special password ❤️");
	};

	const frameProgress = useMemo(() => `${frameIndex + 1} / ${frames.length}`, [frameIndex, frames.length]);

	return (
		<AnimatePresence mode="wait">
			{stage === 'chapters' && frame && (
				<motion.div
					key={frame.id}
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -16 }}
					transition={{ duration: 0.45, ease: 'easeOut' }}
					className="max-w-2xl mx-auto"
				>
					<div className="text-center mb-6 space-y-2">
						<span className="font-mono text-[10px] tracking-[0.28em] uppercase text-plum/45">
							Frame {frameProgress}
						</span>
						<div className="flex items-center justify-center gap-2 text-lilac">
							<Sparkles size={16} />
						</div>
					</div>

					<div className="bg-white/55 backdrop-blur-md border border-white/30 rounded-[2rem] p-6 md:p-8 shadow-[0px_15px_45px_rgba(59,46,53,0.08)]">
						<div className="aspect-[16/10] rounded-[1.5rem] bg-gradient-to-br from-rose-layer/70 via-white to-[#F6E8F2] border border-[#EDC0C0]/40 flex items-center justify-center mb-6 relative overflow-hidden">
							<div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.95),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(183,139,191,0.18),_transparent_40%)]" />
							<div className="relative text-center space-y-4">
								<div className="mx-auto h-28 w-28 rounded-full bg-white/70 border border-white/80 shadow-lg flex items-center justify-center text-5xl">
									{frame.illustration}
								</div>
							</div>
						</div>

						<p className="font-serif text-[19px] md:text-[21px] leading-relaxed italic text-plum/85 text-center max-w-xl mx-auto">
							{frame.text}
						</p>

						<div className="pt-6 text-center">
							<motion.button
								onClick={() => {
									if (frameIndex < frames.length - 1) {
										setFrameIndex((current) => current + 1);
									} else {
										setStage('password');
									}
								}}
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.98 }}
								className="inline-flex items-center gap-2 px-7 py-3 bg-white hover:bg-rose-layer/30 text-plum font-sans text-xs font-semibold tracking-widest rounded-full uppercase transition-colors duration-300 border border-[#EDC0C0]/40"
							>
								Continue
								<ArrowRight size={14} />
							</motion.button>
						</div>
					</div>
				</motion.div>
			)}

			{stage === 'password' && (
				<motion.div
					key="story-password"
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -16 }}
					transition={{ duration: 0.45, ease: 'easeOut' }}
					className="max-w-xl mx-auto text-center space-y-6"
				>
					<div className="space-y-3">
						<span className="font-sans text-xs uppercase tracking-[0.25em] font-semibold text-lilac block">One Last Surprise</span>
						<h2 className="font-serif text-3xl md:text-4xl italic text-plum font-normal">One Last Surprise</h2>
						<p className="font-sans text-[15px] text-plum/60 max-w-md mx-auto leading-relaxed">
							Enter the special password to unlock the birthday video.
						</p>
					</div>

					<div className="bg-white/55 backdrop-blur-md border border-white/30 rounded-[2rem] p-6 md:p-8 shadow-[0px_15px_45px_rgba(59,46,53,0.08)] space-y-5 text-left">
						<div className="relative">
							<input
								type="password"
								value={entry}
								onChange={(event) => setEntry(event.target.value)}
								className="w-full rounded-full border border-[#EDC0C0]/60 bg-white/70 px-5 py-3.5 text-plum outline-none focus:border-lilac transition-colors"
								placeholder="Enter password"
							/>
							<Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-plum/35" size={16} />
						</div>

						{error && (
							<p className="text-center font-serif italic text-rose-500 text-[15px]">
								{error}
							</p>
						)}

						<div className="text-center">
							<motion.button
								onClick={enterPassword}
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.98 }}
								className="inline-flex items-center gap-2 px-8 py-3 bg-lilac hover:bg-lilac-hover text-white font-sans text-xs font-semibold tracking-widest rounded-full uppercase transition-colors duration-300 shadow-md"
							>
								Unlock
							</motion.button>
						</div>
					</div>
				</motion.div>
			)}

			{stage === 'final' && <CustomizerScreen videoUrl={videoUrl} />}
		</AnimatePresence>
	);
}

