import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prophet Stories | Islamic Guidance',
  description: 'Explore the inspiring stories of Prophets mentioned in the Holy Quran and learn valuable lessons from their lives.',
  keywords: 'Islamic stories, prophets, Quran stories, Prophet Muhammad, Prophet Ibrahim, Prophet Yusuf, Prophet Musa',
};

export default function ProphetStoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
} 