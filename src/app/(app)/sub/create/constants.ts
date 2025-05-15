export const companies = [
  'Spotify',
  'Netflix',
  'ChatGPT',
  'Apple Music',
  'YouTube Premium',
  'Amazon Prime Video',
  'Disney+',
  'HBO Max',
  'Adobe Creative Cloud',
  'Microsoft 365',
] as const;

type SubscriptionService = {
  name: (typeof companies)[number];
  imageUrl: string;
};

export const subscriptionServices: SubscriptionService[] = [
  {
    name: 'Spotify',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
  },
  {
    name: 'Netflix',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
  },
  {
    name: 'ChatGPT',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
  },
  {
    name: 'Apple Music',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/d/df/Apple_Music_logo.svg',
  },
  {
    name: 'YouTube Premium',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png',
  },
  {
    name: 'Amazon Prime Video',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png',
  },
  {
    name: 'Disney+',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg',
  },
  {
    name: 'HBO Max',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg',
  },
  {
    name: 'Adobe Creative Cloud',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/d/d3/Adobe_Creative_Cloud_rainbow_icon.svg',
  },
  {
    name: 'Microsoft 365',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  },
];
