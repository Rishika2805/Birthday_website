import { StoryFrame } from './types';

export const photos = [
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=900'
];

export const captions = [
  'That smile ❤️',
  'My favorite picture.',
  'Looking handsome as always.',
  'I could stare at this forever.',
  'Still my favorite human.',
  'My heart always softens here.',
  'You make every frame feel warmer.',
  'The kind of face I never forget.'
];

const reasonSeeds = [
  'Your laugh makes every room feel lighter.',
  'You always know how to make distance feel smaller.',
  'The way you love people is gentle and real.',
  'You are patient in ways that feel rare and beautiful.',
  'You turn ordinary days into something worth remembering.',
  'Your voice can calm my whole nervous system.',
  'You make kindness look effortless.',
  'You remember the little things that matter most to me.',
  'Being loved by you feels safe and steady.',
  'Your smile is still one of my favorite places to look.',
  'You make me feel understood without needing many words.',
  'Your warmth reaches even through miles.',
  'You carry so much tenderness in your heart.',
  'You make the future feel exciting instead of scary.',
  'You are my favorite comfort and my favorite thrill.',
  'Your mind is thoughtful, curious, and endlessly lovely.',
  'You have a way of making simple moments feel special.',
  'You support me in quiet ways that mean everything.',
  'You are soft where the world can be sharp.',
  'You feel like home, even from far away.'
];

const reasonSuffixes = [
  'and I notice it more every single day.',
  'especially on the days when I need it most.',
  'and it makes me love you even more.',
  'which is one of the many reasons I adore you.',
  'and that feeling never gets old.'
];

export const reasons = reasonSeeds.flatMap((reason) =>
  reasonSuffixes.map((suffix) => `${reason} ${suffix}`)
);

export const storyFrames: StoryFrame[] = [
  { id: 'story-1', illustration: '💌', text: 'Some stories begin quietly, and then suddenly they glow. Yours did that for me almost right away.' },
  { id: 'story-2', illustration: '🌙', text: 'Even when miles stood between us, your words made the world feel close and beautifully possible.' },
  { id: 'story-3', illustration: '☕', text: 'I kept the smallest moments because they already felt too precious to forget.' },
  { id: 'story-4', illustration: '❤️', text: 'The more I knew you, the easier it became to fall for the kindness hiding inside every detail of you.' },
  { id: 'story-5', illustration: '✨', text: 'You made softness feel safe, and every quiet day feel a little more like home.' },
  { id: 'story-6', illustration: '🌸', text: 'The space between us never mattered as much as the way our hearts kept reaching for each other.' },
  { id: 'story-7', illustration: '🎀', text: 'Some of my favorite love stories live inside the ordinary things, like checking in, laughing, and being known.' },
  { id: 'story-8', illustration: '💞', text: 'There is a tenderness in the way you exist that makes me want to hold every moment a little longer.' },
  { id: 'story-9', illustration: '🌷', text: 'When I think about what comes next, I always imagine more warmth, more laughter, and more us.' },
  { id: 'story-10', illustration: '🎂', text: 'This is only one chapter, but it already feels like one of the most beautiful things I have ever held.' }
];

export const storyPassword = 'starlight';
export const birthdayVideoUrl = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
