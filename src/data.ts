/// <reference types="vite/client" />
import type { GalleryItem, StoryFrame } from './types';


const galleryImageModules = import.meta.glob('../assets/gallery/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default'
}) as Record<string, string>;

const storyImageModules = import.meta.glob('../assets/story/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default'
}) as Record<string, string>;

function extractSortKey(filePath: string) {
  const fileName = filePath.split('/').pop() ?? '';
  const match = fileName.match(/(\d+)/);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
}

const galleryImages = Object.entries(galleryImageModules)
  .sort(([leftPath], [rightPath]) => extractSortKey(leftPath) - extractSortKey(rightPath))
  .map(([, value]) => value)
  .slice(0, 5);

const storyImages = Object.entries(storyImageModules)
  .sort(([leftPath], [rightPath]) => extractSortKey(leftPath) - extractSortKey(rightPath))
  .map(([, value]) => value)
  .slice(0, 10);

export const galleryItems: GalleryItem[] = galleryImages.map((image, index) => ({
  id: `photo-${index + 1}`,
  image,
  caption: [
    'That smile',
    'My favorite picture.',
    'Looking handsome as always.',
    'I could stare at this forever.',
    'Still my favorite human.'
  ][index],
  rotation: [-4, 3, -2, 4, -3][index]
}));

export const reasons: string[] = [
  "I love your smile.",
  "I love the way you make me laugh.",
  "I love how safe I feel with you.",
  "I love that you always listen to me.",
  "I love your kind heart.",
  "I love your patience.",
  "I love how hardworking you are.",
  "I love your honesty.",
  "I love how you never pretend to be someone you're not.",
  "I love the way you care about the people you love.",
  "I love your voice.",
  "I love hearing your laugh.",
  "I love how calm you make me feel.",
  "I love that I can tell you anything.",
  "I love how you always make ordinary days special.",
  "I love the way you understand me.",
  "I love your little habits.",
  "I love your late-night conversations.",
  "I love that you always make time for me.",
  "I love how you support my dreams.",
  "I love that you believe in me.",
  "I love how you encourage me when I'm down.",
  "I love your determination.",
  "I love how responsible you are.",
  "I love your confidence.",
  "I love your silly side.",
  "I love how cute you are without even trying.",
  "I love how excited you get about the things you enjoy.",
  "I love that you're my favorite notification.",
  "I love every good morning text from you.",
  "I love every good night message from you.",
  "I love every random meme you send me.",
  "I love every call we have.",
  "I love the way time flies when we're talking.",
  "I love how you make distance feel smaller.",
  "I love that we met through BGMI.",
  "I love that one random game changed my life.",
  "I love that you started as my teammate.",
  "I love that you became my favorite person.",
  "I love every match we played together.",
  "I love every victory we celebrated.",
  "I love every funny moment we shared.",
  "I love that you became my safe place.",
  "I love that you're my comfort person.",
  "I love how peaceful my heart feels with you.",
  "I love that you never judge me.",
  "I love how you respect me.",
  "I love that you appreciate the little things.",
  "I love how thoughtful you are.",
  "I love how genuine you are.",
  "I love your strength.",
  "I love your maturity.",
  "I love your sense of humor.",
  "I love that you can make me smile even on bad days.",
  "I love how we can be weird together.",
  "I love our random conversations.",
  "I love our deep conversations.",
  "I love our comfortable silence.",
  "I love how you always feel like home.",
  "I love the memories we've made together.",
  "I love the memories we're still creating.",
  "I love dreaming about our future together.",
  "I love imagining all the places we'll visit.",
  "I love that you're worth waiting for.",
  "I love how distance never changed my feelings.",
  "I love your reassuring words.",
  "I love your hugs—even if I have to imagine them for now.",
  "I love how much I miss you.",
  "I love that missing you reminds me how much you matter.",
  "I love your smile in every picture.",
  "I love the sparkle in your eyes.",
  "I love how you always manage to brighten my day.",
  "I love that you make me want to become a better person.",
  "I love how proud I am of you.",
  "I love celebrating your achievements.",
  "I love being your biggest supporter.",
  "I love that you always cheer for me too.",
  "I love that you're my best friend.",
  "I love that you're my favorite teammate.",
  "I love that you're my favorite person.",
  "I love how lucky I feel to have met you.",
  "I love every little thing that reminds me of you.",
  "I love how every song seems to remind me of us.",
  "I love every future birthday we'll celebrate together.",
  "I love that we never give up on each other.",
  "I love your heart more than anything.",
  "I love your imperfections because they're part of you.",
  "I love that you make life more beautiful.",
  "I love how easy it is to love you.",
  "I love every version of you.",
  "I love the person I become when I'm with you.",
  "I love that our story is unique.",
  "I love that you're one of my greatest blessings.",
  "I love that you walked into my life unexpectedly.",
  "I love every chapter of our story.",
  "I love that you're my today.",
  "I love that you're in my tomorrow.",
  "I love every reason I haven't even discovered yet.",
  "I love you more than words can ever explain.",
  "And finally... I love you simply because you're you."
];

export const storyFrames: StoryFrame[] = [
  { id: 'story-1', chapterTitle: 'The First Warm Spark', narration: 'Living hundreds of miles apart in different cities, our story began with a chance meeting through a mutual friend in BGMI.', illustrationSrc: storyImages[0], illustrationAlt: 'Story frame 1' },
  { id: 'story-2', chapterTitle: 'A Voice Across the Distance', narration: 'A simple friend request turned two strangers into gaming buddies who started spending time together online.', illustrationSrc: storyImages[1], illustrationAlt: 'Story frame 2' },
  { id: 'story-3', chapterTitle: 'Little Moments, Kept Carefully', narration: 'While playing together regularly, I admired his quiet nature, kindness, and respectful personality from afar.', illustrationSrc: storyImages[2], illustrationAlt: 'Story frame 3' },
  { id: 'story-4', chapterTitle: 'The Boy I Fell For', narration: 'As life became difficult for both of us, we slowly began sharing our relationship struggles and emotions with each other.', illustrationSrc: storyImages[3], illustrationAlt: 'Story frame 4' },
  { id: 'story-5', chapterTitle: 'Quiet Comforts', narration: 'During heartbreaks and stressful exam days, we stood by one another with constant support and encouragement.', illustrationSrc: storyImages[4], illustrationAlt: 'Story frame 5' },
  { id: 'story-6', chapterTitle: 'Distance Could Not Win', narration: 'What started inside a game soon grew into daily conversations about our lives, dreams, fears, and future hopes.', illustrationSrc: storyImages[5], illustrationAlt: 'Story frame 6' },
  { id: 'story-7', chapterTitle: 'The Sweetest Routine', narration: "Without realizing it, we became each other's safe place—the first person we wanted to talk to every day.", illustrationSrc: storyImages[6], illustrationAlt: 'Story frame 7' },
  { id: 'story-8', chapterTitle: 'Always Soft for You', narration: 'Through late-night calls, endless conversations, and unwavering support, friendship quietly blossomed into love.', illustrationSrc: storyImages[7], illustrationAlt: 'Story frame 8' },
  { id: 'story-9', chapterTitle: 'A Future in Bloom', narration: 'The boy I once knew only through a game became the person I trusted most and held closest to my heart.', illustrationSrc: storyImages[8], illustrationAlt: 'Story frame 9' },
  { id: 'story-10', chapterTitle: 'And the Story Keeps Going', narration: 'Today, despite the distance between our cities, we continue to grow together in a loving long-distance relationship built on trust, friendship, and love.', illustrationSrc: storyImages[9], illustrationAlt: 'Story frame 10' }
];

export const storyPassword = '2804';
export const birthdayVideoUrl = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
