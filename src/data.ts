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
