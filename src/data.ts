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
  { id: 'story-1', chapterTitle: 'The First Warm Spark', narration: 'Some stories begin quietly, and then suddenly they glow. Yours did that for me almost right away.', illustrationSrc: storyImages[0], illustrationAlt: 'Story frame 1' },
  { id: 'story-2', chapterTitle: 'A Voice Across the Distance', narration: 'Even when miles stood between us, your words made the world feel close and beautifully possible.', illustrationSrc: storyImages[1], illustrationAlt: 'Story frame 2' },
  { id: 'story-3', chapterTitle: 'Little Moments, Kept Carefully', narration: 'I kept the smallest moments because they already felt too precious to forget.', illustrationSrc: storyImages[2], illustrationAlt: 'Story frame 3' },
  { id: 'story-4', chapterTitle: 'The Boy I Fell For', narration: 'The more I knew you, the easier it became to fall for the kindness hiding inside every detail of you.', illustrationSrc: storyImages[3], illustrationAlt: 'Story frame 4' },
  { id: 'story-5', chapterTitle: 'Quiet Comforts', narration: 'You made softness feel safe, and every quiet day feel a little more like home.', illustrationSrc: storyImages[4], illustrationAlt: 'Story frame 5' },
  { id: 'story-6', chapterTitle: 'Distance Could Not Win', narration: 'The space between us never mattered as much as the way our hearts kept reaching for each other.', illustrationSrc: storyImages[5], illustrationAlt: 'Story frame 6' },
  { id: 'story-7', chapterTitle: 'The Sweetest Routine', narration: 'Some of my favorite love stories live inside the ordinary things, like checking in, laughing, and being known.', illustrationSrc: storyImages[6], illustrationAlt: 'Story frame 7' },
  { id: 'story-8', chapterTitle: 'Always Soft for You', narration: 'There is a tenderness in the way you exist that makes me want to hold every moment a little longer.', illustrationSrc: storyImages[7], illustrationAlt: 'Story frame 8' },
  { id: 'story-9', chapterTitle: 'A Future in Bloom', narration: 'When I think about what comes next, I always imagine more warmth, more laughter, and more us.', illustrationSrc: storyImages[8], illustrationAlt: 'Story frame 9' },
  { id: 'story-10', chapterTitle: 'And the Story Keeps Going', narration: 'This is only one chapter, but it already feels like one of the most beautiful things I have ever held.', illustrationSrc: storyImages[9], illustrationAlt: 'Story frame 10' }
];

export const storyPassword = '2804';
export const birthdayVideoUrl = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
