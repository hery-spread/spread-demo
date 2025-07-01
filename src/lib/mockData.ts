import {
  Influencer,
  InfluencerDetails,
  InfluencerList,
  UserAccount,
} from "@/types";

// Données mockées des influenceurs
export const mockInfluencers: Influencer[] = [
  {
    id: "1",
    name: "Zidane",
    username: "zidane",
    platform: "instagram",
    avatar: "/avatars/zidane.jpg",
    followers: 44300000,
    engagement: 371000,
    engagementRate: 0.84,
    country: "FR",
    verified: true,
    email: "contact@zidane.com",
    bio: "Légende du football français",
  },
  {
    id: "2",
    name: "Nabilla Benattia",
    username: "nabilla",
    platform: "instagram",
    avatar: "/avatars/nabilla.jpg",
    followers: 6800000,
    engagement: 340000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    email: "contact@nabilla.com",
    bio: "TV Personality & Entrepreneur",
  },
  {
    id: "3",
    name: "Cyril Lignac",
    username: "cyril_lignac",
    platform: "instagram",
    avatar: "/avatars/cyril.jpg",
    followers: 1800000,
    engagement: 90000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    email: "chef@cyril-lignac.com",
    bio: "Chef cuisinier, restaurateur",
  },
  {
    id: "4",
    name: "Caroline Receveur",
    username: "carolinereceveur",
    platform: "instagram",
    avatar: "/avatars/caroline.jpg",
    followers: 3200000,
    engagement: 160000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    email: "contact@caroline-receveur.com",
    bio: "Entrepreneur, Maman",
  },
  {
    id: "5",
    name: "Squeezie",
    username: "squeezie",
    platform: "youtube",
    avatar: "/avatars/squeezie.jpg",
    followers: 18500000,
    engagement: 925000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    email: "contact@squeezie.fr",
    bio: "YouTuber Gaming & Entertainment",
  },
  {
    id: "6",
    name: "Norman",
    username: "norman",
    platform: "youtube",
    avatar: "/avatars/norman.jpg",
    followers: 12300000,
    engagement: 615000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    email: "contact@norman.fr",
    bio: "YouTuber Humour",
  },
  {
    id: "7",
    name: "Enjoy Phoenix",
    username: "enjoyphoenix",
    platform: "youtube",
    avatar: "/avatars/enjoyphoenix.jpg",
    followers: 3500000,
    engagement: 175000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    email: "contact@enjoyphoenix.fr",
    bio: "YouTuber Lifestyle & Beauty",
  },
  {
    id: "8",
    name: "Michou",
    username: "michou",
    platform: "tiktok",
    avatar: "/avatars/michou.jpg",
    followers: 8900000,
    engagement: 445000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    email: "contact@michou.fr",
    bio: "Créateur de contenu TikTok",
  },
  {
    id: "9",
    name: "Lena Situations",
    username: "lena.situations",
    platform: "instagram",
    avatar: "/avatars/lena.jpg",
    followers: 4100000,
    engagement: 205000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    email: "contact@lenasituations.com",
    bio: "Content Creator & Entrepreneur",
  },
  {
    id: "10",
    name: "Tibo InShape",
    username: "tiboinshape",
    platform: "youtube",
    avatar: "/avatars/tibo.jpg",
    followers: 8700000,
    engagement: 435000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    email: "contact@tiboinshape.fr",
    bio: "Fitness & Lifestyle YouTuber",
  },
  // Continuation avec 40 autres profils...
  {
    id: "11",
    name: "Kev Adams",
    username: "kevadams",
    platform: "instagram",
    avatar: "/avatars/kevadams.jpg",
    followers: 5200000,
    engagement: 260000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    email: "contact@kevadams.com",
    bio: "Acteur & Humoriste",
  },
  {
    id: "12",
    name: "Maeva Ghennam",
    username: "maevaghennam",
    platform: "instagram",
    avatar: "/avatars/maeva.jpg",
    followers: 3800000,
    engagement: 190000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    email: "contact@maevaghennam.com",
    bio: "TV Reality & Entrepreneur",
  },
  {
    id: "13",
    name: "Thomas Pesquet",
    username: "thom_astro",
    platform: "instagram",
    avatar: "/avatars/thomas.jpg",
    followers: 2300000,
    engagement: 115000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    email: "contact@thomas-pesquet.com",
    bio: "Astronaute ESA",
  },
  {
    id: "14",
    name: "Keen'V",
    username: "keenv_officiel",
    platform: "instagram",
    avatar: "/avatars/keenv.jpg",
    followers: 1900000,
    engagement: 95000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    email: "contact@keenv.com",
    bio: "Artiste Musicien",
  },
  {
    id: "15",
    name: "Sisika",
    username: "sisika",
    platform: "tiktok",
    avatar: "/avatars/sisika.jpg",
    followers: 6700000,
    engagement: 335000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    email: "contact@sisika.fr",
    bio: "Créatrice de contenu TikTok",
  },
  // Ajout de 35 autres profils pour atteindre 50...
  {
    id: "16",
    name: "Jessica Thivenin",
    username: "jessicathivenin",
    platform: "instagram",
    avatar: "/avatars/jessica.jpg",
    followers: 4600000,
    engagement: 230000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    email: "contact@jessicathivenin.com",
    bio: "TV Reality & Maman",
  },
  {
    id: "17",
    name: "Mister V",
    username: "mister_v",
    platform: "youtube",
    avatar: "/avatars/misterv.jpg",
    followers: 5800000,
    engagement: 290000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    email: "contact@misterv.fr",
    bio: "YouTuber Humour",
  },
  {
    id: "18",
    name: "Amixem",
    username: "amixem",
    platform: "youtube",
    avatar: "/avatars/amixem.jpg",
    followers: 7200000,
    engagement: 360000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    email: "contact@amixem.fr",
    bio: "YouTuber Gaming & Lifestyle",
  },
  {
    id: "19",
    name: "Natoo",
    username: "natoo",
    platform: "youtube",
    avatar: "/avatars/natoo.jpg",
    followers: 4900000,
    engagement: 245000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    email: "contact@natoo.fr",
    bio: "YouTuber Humour & Lifestyle",
  },
  {
    id: "20",
    name: "Cyprien",
    username: "cyprien",
    platform: "youtube",
    avatar: "/avatars/cyprien.jpg",
    followers: 14100000,
    engagement: 705000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    email: "contact@cyprien.fr",
    bio: "YouTuber Humour",
  },
  {
    id: "21",
    name: "Norman Thavaud",
    username: "norman_fait_des_videos",
    platform: "youtube",
    avatar: "/avatars/norman.jpg",
    followers: 12100000,
    engagement: 650000,
    engagementRate: 5.37,
    country: "FR",
    verified: true,
    email: "contact@norman.fr",
    bio: "Créateur de contenu humoristique YouTube",
  },
  {
    id: "22",
    name: "Natoo",
    username: "natoo",
    platform: "youtube",
    avatar: "/avatars/natoo.jpg",
    followers: 4900000,
    engagement: 245000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    email: "contact@natoo.fr",
    bio: "YouTuber Humour & Lifestyle",
  },
  {
    id: "23",
    name: "Amixem",
    username: "amixem",
    platform: "youtube",
    avatar: "/avatars/amixem.jpg",
    followers: 7200000,
    engagement: 432000,
    engagementRate: 6.0,
    country: "FR",
    verified: true,
    email: "contact@amixem.fr",
    bio: "Gaming & Lifestyle YouTube",
  },
  {
    id: "24",
    name: "Mister V",
    username: "mister_v",
    platform: "youtube",
    avatar: "/avatars/misterv.jpg",
    followers: 5800000,
    engagement: 348000,
    engagementRate: 6.0,
    country: "FR",
    verified: true,
    email: "contact@misterv.fr",
    bio: "Humoriste YouTuber",
  },
  {
    id: "25",
    name: "Lena Situations",
    username: "lena.situations",
    platform: "instagram",
    avatar: "/avatars/lena.jpg",
    followers: 4100000,
    engagement: 205000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    email: "contact@lenasituations.com",
    bio: "Content Creator & Entrepreneur",
  },
  {
    id: "26",
    name: "Tibo InShape",
    username: "tiboinshape",
    platform: "youtube",
    avatar: "/avatars/tibo.jpg",
    followers: 8700000,
    engagement: 435000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    email: "contact@tiboinshape.fr",
    bio: "Fitness & Lifestyle YouTuber",
  },
  {
    id: "27",
    name: "Enjoy Phoenix",
    username: "enjoyphoenix",
    platform: "youtube",
    avatar: "/avatars/enjoyphoenix.jpg",
    followers: 3500000,
    engagement: 175000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    email: "contact@enjoyphoenix.fr",
    bio: "YouTuber Lifestyle & Beauty",
  },
  {
    id: "28",
    name: "Bigflo & Oli",
    username: "bigfloetoli",
    platform: "instagram",
    avatar: "/avatars/bigfloetoli.jpg",
    followers: 2800000,
    engagement: 168000,
    engagementRate: 6.0,
    country: "FR",
    verified: true,
    email: "contact@bigfloetoli.com",
    bio: "Duo de rap français",
  },
  {
    id: "29",
    name: "Maître Gims",
    username: "gims",
    platform: "instagram",
    avatar: "/avatars/gims.jpg",
    followers: 8200000,
    engagement: 410000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    email: "contact@gims.fr",
    bio: "Artiste rap & RnB",
  },
  {
    id: "30",
    name: "Gotaga",
    username: "gotaga",
    platform: "youtube",
    avatar: "/avatars/gotaga.jpg",
    followers: 3200000,
    engagement: 192000,
    engagementRate: 6.0,
    country: "FR",
    verified: true,
    email: "contact@gotaga.tv",
    bio: "Streameur Gaming professionnel",
  },
  {
    id: "31",
    name: "Juju Fitcats",
    username: "jujufitcats",
    platform: "instagram",
    avatar: "/avatars/jujufitcats.jpg",
    followers: 1800000,
    engagement: 126000,
    engagementRate: 7.0,
    country: "FR",
    verified: true,
    email: "contact@jujufitcats.com",
    bio: "Fitness & Motivation",
  },
  {
    id: "32",
    name: "Le Rire Jaune",
    username: "lerirejaune",
    platform: "youtube",
    avatar: "/avatars/lerirejaune.jpg",
    followers: 4100000,
    engagement: 205000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    email: "contact@lerirejaune.fr",
    bio: "Duo YouTube humour asiatique",
  },
  {
    id: "33",
    name: "Sisika",
    username: "sisika",
    platform: "tiktok",
    avatar: "/avatars/sisika.jpg",
    followers: 6700000,
    engagement: 469000,
    engagementRate: 7.0,
    country: "FR",
    verified: true,
    email: "contact@sisika.fr",
    bio: "TikTok Creator lifestyle",
  },
  {
    id: "34",
    name: "Fabien Olicard",
    username: "fabienolicard",
    platform: "youtube",
    avatar: "/avatars/fabienolicard.jpg",
    followers: 1600000,
    engagement: 96000,
    engagementRate: 6.0,
    country: "FR",
    verified: true,
    email: "contact@fabienolicard.com",
    bio: "Mentaliste & Vulgarisateur",
  },
  {
    id: "35",
    name: "Dr Nozman",
    username: "drnozman",
    platform: "youtube",
    avatar: "/avatars/drnozman.jpg",
    followers: 3800000,
    engagement: 228000,
    engagementRate: 6.0,
    country: "FR",
    verified: true,
    email: "contact@drnozman.fr",
    bio: "Science & Expériences YouTube",
  },
  {
    id: "36",
    name: "MrAntoineDaniel",
    username: "antoine_daniel",
    platform: "youtube",
    avatar: "/avatars/antoine.jpg",
    followers: 3200000,
    engagement: 256000,
    engagementRate: 8.0,
    country: "FR",
    verified: true,
    email: "contact@antoinedaniel.fr",
    bio: "Critique & Gaming YouTube",
  },
  {
    id: "37",
    name: "Salut les Geeks",
    username: "salutlesgeeks",
    platform: "youtube",
    avatar: "/avatars/salutlesgeeks.jpg",
    followers: 1200000,
    engagement: 72000,
    engagementRate: 6.0,
    country: "FR",
    verified: true,
    email: "contact@salutlesgeeks.fr",
    bio: "Culture geek & technologie",
  },
  {
    id: "38",
    name: "Inoxtag",
    username: "inoxtag",
    platform: "youtube",
    avatar: "/avatars/inoxtag.jpg",
    followers: 5400000,
    engagement: 432000,
    engagementRate: 8.0,
    country: "FR",
    verified: true,
    email: "contact@inoxtag.fr",
    bio: "Gaming & Aventure YouTube",
  },
  {
    id: "39",
    name: "Théo Gordy",
    username: "theogordy",
    platform: "instagram",
    avatar: "/avatars/theogordy.jpg",
    followers: 950000,
    engagement: 76000,
    engagementRate: 8.0,
    country: "FR",
    verified: true,
    email: "contact@theogordy.com",
    bio: "Fitness & Motivation",
  },
  {
    id: "40",
    name: "Joyca",
    username: "joyca",
    platform: "youtube",
    avatar: "/avatars/joyca.jpg",
    followers: 2800000,
    engagement: 168000,
    engagementRate: 6.0,
    country: "FR",
    verified: true,
    email: "contact@joyca.fr",
    bio: "Lifestyle & Mode YouTube",
  },
  {
    id: "41",
    name: "Léna Mahfouf",
    username: "lenamahfouf",
    platform: "instagram",
    avatar: "/avatars/lenamahfouf.jpg",
    followers: 2200000,
    engagement: 154000,
    engagementRate: 7.0,
    country: "FR",
    verified: true,
    email: "contact@lenamahfouf.com",
    bio: "Digital Creator & Podcast",
  },
  {
    id: "42",
    name: "Maeva Cook",
    username: "maevacook",
    platform: "instagram",
    avatar: "/avatars/maevacook.jpg",
    followers: 1800000,
    engagement: 126000,
    engagementRate: 7.0,
    country: "FR",
    verified: true,
    email: "contact@maevacook.com",
    bio: "Cuisine & Lifestyle",
  },
  {
    id: "43",
    name: "Seb la Frite",
    username: "seblafrite",
    platform: "youtube",
    avatar: "/avatars/seblafrite.jpg",
    followers: 4200000,
    engagement: 294000,
    engagementRate: 7.0,
    country: "FR",
    verified: true,
    email: "contact@seblafrite.fr",
    bio: "Gaming & React YouTube",
  },
  {
    id: "44",
    name: "SLG",
    username: "slg",
    platform: "youtube",
    avatar: "/avatars/slg.jpg",
    followers: 2100000,
    engagement: 147000,
    engagementRate: 7.0,
    country: "FR",
    verified: true,
    email: "contact@slg.fr",
    bio: "Gaming FIFA YouTube",
  },
  {
    id: "45",
    name: "Mickaël Vendetta",
    username: "mickaelvendetta",
    platform: "instagram",
    avatar: "/avatars/mickaelvendetta.jpg",
    followers: 750000,
    engagement: 60000,
    engagementRate: 8.0,
    country: "FR",
    verified: false,
    email: "contact@mickaelvendetta.com",
    bio: "TV Reality & Music",
  },
  {
    id: "46",
    name: "Tatiana Silva",
    username: "tatianasilva",
    platform: "instagram",
    avatar: "/avatars/tatianasilva.jpg",
    followers: 1200000,
    engagement: 84000,
    engagementRate: 7.0,
    country: "FR",
    verified: true,
    email: "contact@tatianasilva.com",
    bio: "Présentatrice météo & Model",
  },
  {
    id: "47",
    name: "McFly et Carlito",
    username: "mcflyetcarlito",
    platform: "youtube",
    avatar: "/avatars/mcflyetcarlito.jpg",
    followers: 6500000,
    engagement: 390000,
    engagementRate: 6.0,
    country: "FR",
    verified: true,
    email: "contact@mcflyetcarlito.fr",
    bio: "Duo YouTube humour",
  },
  {
    id: "48",
    name: "Kameto",
    username: "kameto",
    platform: "youtube",
    avatar: "/avatars/kameto.jpg",
    followers: 2800000,
    engagement: 224000,
    engagementRate: 8.0,
    country: "FR",
    verified: true,
    email: "contact@kameto.tv",
    bio: "Streameur League of Legends",
  },
  {
    id: "49",
    name: "Léa Elui",
    username: "leaelui",
    platform: "tiktok",
    avatar: "/avatars/leaelui.jpg",
    followers: 13200000,
    engagement: 792000,
    engagementRate: 6.0,
    country: "FR",
    verified: true,
    email: "contact@leaelui.com",
    bio: "TikTok Dance & Lifestyle",
  },
  {
    id: "50",
    name: "JDG",
    username: "joueurdugrenier",
    platform: "youtube",
    avatar: "/avatars/jdg.jpg",
    followers: 4100000,
    engagement: 287000,
    engagementRate: 7.0,
    country: "FR",
    verified: true,
    email: "contact@joueurdugrenier.fr",
    bio: "Test de jeux rétro YouTube",
  },
];

// Données détaillées pour 5 influenceurs
export const mockInfluencerDetails: Record<string, InfluencerDetails> = {
  "1": {
    ...mockInfluencers[0],
    stats: {
      avgLikes: 162000,
      avgComments: 200,
      avgViews: 1900000,
      totalPosts: 1000,
    },
    audience: {
      gender: { male: 31.8, female: 68.2 },
      age: {
        "13-17": 6.3,
        "18-24": 39.4,
        "25-34": 42.1,
        "35-44": 9.4,
        "45-64": 2.7,
      },
      countries: {
        France: 58.2,
        Maroc: 3.6,
        USA: 3.2,
        Belgique: 2.8,
        Algérie: 2.5,
      },
      cities: {
        Paris: 6.8,
        Marseille: 1.5,
        Lyon: 1.1,
        Bordeaux: 1.0,
        Bruxelles: 0.9,
      },
      languages: {
        Français: 69.7,
        Anglais: 16.0,
        Arabe: 4.1,
      },
      ethnicities: {
        Caucasien: 70.5,
        "Afro-descendant": 17.3,
        Asiatique: 10.1,
      },
      interests: {
        topics: {
          "Mode & Accessoires": 41.1,
          "Famille & Relations": 39.3,
          "Voyage & Tourisme": 32.7,
          Photographie: 31.7,
          Alimentation: 31.0,
        },
        brands: {
          "Walt Disney": 11.4,
          Apple: 8.3,
          Nike: 7.3,
          Zara: 6.4,
          Adidas: 5.2,
        },
      },
    },
  },
  "2": {
    ...mockInfluencers[1],
    stats: {
      avgLikes: 125000,
      avgComments: 1800,
      avgViews: 800000,
      totalPosts: 2200,
    },
    audience: {
      gender: { male: 25.3, female: 74.7 },
      age: {
        "13-17": 12.5,
        "18-24": 45.2,
        "25-34": 31.8,
        "35-44": 8.1,
        "45-64": 2.4,
      },
      countries: {
        France: 62.1,
        Algérie: 4.2,
        Maroc: 3.8,
        Belgique: 3.1,
        Suisse: 2.5,
      },
      cities: {
        Paris: 8.2,
        Marseille: 2.1,
        Lyon: 1.8,
        Nice: 1.2,
        Toulouse: 1.0,
      },
      languages: {
        Français: 72.3,
        Arabe: 12.1,
        Anglais: 8.9,
      },
      ethnicities: {
        Caucasien: 65.2,
        "Afro-descendant": 22.1,
        Asiatique: 8.7,
      },
      interests: {
        topics: {
          "Mode & Accessoires": 52.3,
          Beauté: 48.7,
          "Célébrités & Divertissement": 41.2,
          "Famille & Relations": 35.8,
          "Voyage & Tourisme": 28.9,
        },
        brands: {
          Chanel: 15.2,
          "Louis Vuitton": 12.8,
          Dior: 10.4,
          Zara: 9.7,
          "Yves Saint Laurent": 8.3,
        },
      },
    },
  },
  "3": {
    ...mockInfluencers[2],
    stats: {
      avgLikes: 45000,
      avgComments: 850,
      avgViews: 320000,
      totalPosts: 1800,
    },
    audience: {
      gender: { male: 42.1, female: 57.9 },
      age: {
        "13-17": 3.2,
        "18-24": 22.8,
        "25-34": 38.5,
        "35-44": 24.7,
        "45-64": 10.8,
      },
      countries: {
        France: 78.9,
        Suisse: 4.1,
        Belgique: 3.8,
        Canada: 2.2,
        USA: 1.8,
      },
      cities: {
        Paris: 12.5,
        Lyon: 3.2,
        Marseille: 2.8,
        Bordeaux: 2.1,
        Toulouse: 1.9,
      },
      languages: {
        Français: 85.7,
        Anglais: 8.9,
        Italien: 2.1,
      },
      ethnicities: {
        Caucasien: 82.3,
        "Afro-descendant": 8.9,
        Asiatique: 5.2,
      },
      interests: {
        topics: {
          Alimentation: 65.4,
          Cuisine: 58.7,
          "Famille & Relations": 42.1,
          "Voyage & Tourisme": 35.8,
          "Bien-être & Fitness": 28.9,
        },
        brands: {
          "Le Creuset": 18.7,
          Thermomix: 15.2,
          "Kitchen Aid": 12.8,
          Tefal: 10.4,
          "Pierre Hermé": 8.9,
        },
      },
    },
  },
  "4": {
    ...mockInfluencers[3],
    stats: {
      avgLikes: 85000,
      avgComments: 1200,
      avgViews: 480000,
      totalPosts: 3200,
    },
    audience: {
      gender: { male: 18.7, female: 81.3 },
      age: {
        "13-17": 8.9,
        "18-24": 38.7,
        "25-34": 35.2,
        "35-44": 13.8,
        "45-64": 3.4,
      },
      countries: {
        France: 68.9,
        Belgique: 3.8,
        Suisse: 3.2,
        Canada: 2.8,
        Maroc: 2.1,
      },
      cities: {
        Paris: 9.8,
        Lyon: 2.1,
        Marseille: 1.8,
        Bordeaux: 1.5,
        Nice: 1.2,
      },
      languages: {
        Français: 74.2,
        Anglais: 15.8,
        Espagnol: 4.2,
      },
      ethnicities: {
        Caucasien: 72.1,
        "Afro-descendant": 15.8,
        Asiatique: 7.9,
      },
      interests: {
        topics: {
          "Mode & Accessoires": 58.7,
          Beauté: 52.3,
          "Famille & Relations": 45.8,
          "Voyage & Tourisme": 38.9,
          Entrepreneuriat: 32.1,
        },
        brands: {
          Zara: 16.8,
          "H&M": 14.2,
          Sephora: 12.9,
          Mango: 10.7,
          "& Other Stories": 8.9,
        },
      },
    },
  },
  "5": {
    ...mockInfluencers[4],
    stats: {
      avgLikes: 520000,
      avgComments: 8500,
      avgViews: 2800000,
      totalPosts: 950,
    },
    audience: {
      gender: { male: 78.9, female: 21.1 },
      age: {
        "13-17": 35.8,
        "18-24": 42.1,
        "25-34": 18.7,
        "35-44": 2.8,
        "45-64": 0.6,
      },
      countries: {
        France: 72.8,
        Belgique: 4.2,
        Suisse: 3.8,
        Canada: 3.1,
        Algérie: 2.8,
      },
      cities: {
        Paris: 11.2,
        Lyon: 3.8,
        Marseille: 2.9,
        Toulouse: 2.1,
        Bordeaux: 1.8,
      },
      languages: {
        Français: 79.8,
        Anglais: 12.1,
        Allemand: 3.2,
      },
      ethnicities: {
        Caucasien: 75.8,
        "Afro-descendant": 12.9,
        Asiatique: 8.1,
      },
      interests: {
        topics: {
          Gaming: 68.9,
          "Technologie & Gadgets": 45.2,
          "Divertissement & Humour": 42.8,
          "Animation & Comics": 35.7,
          "Célébrités & Divertissement": 28.9,
        },
        brands: {
          PlayStation: 22.8,
          Nintendo: 18.9,
          Xbox: 15.2,
          Steam: 12.7,
          Twitch: 10.8,
        },
      },
    },
  },
};

// Données des listes
export const mockLists: InfluencerList[] = [
  {
    id: "1",
    name: "HelloFresh",
    createdAt: "2024-06-15",
    influencers: [
      { id: "1", contactName: "Zidane", contactEmail: "contact@zidane.com" },
      {
        id: "2",
        contactName: "Nabilla Vergara",
        contactEmail: "contact@nabillavergara.com",
      },
      { id: "4", contactName: "Dadju", contactEmail: "contact@dadju.com" },
      {
        id: "5",
        contactName: "Kev Adams",
        contactEmail: "contact@kevadams.com",
      },
    ],
  },
  {
    id: "2",
    name: "Food",
    createdAt: "2024-06-10",
    influencers: [
      { id: "3", contactName: "Squeezie", contactEmail: "contact@squeezie.fr" },
      { id: "7", contactName: "Chef Martin", contactEmail: "chef@martin.com" },
      {
        id: "8",
        contactName: "Julie Cuisine",
        contactEmail: "julie@cuisine.fr",
      },
    ],
  },
  {
    id: "3",
    name: "Auto",
    createdAt: "2024-05-28",
    influencers: [
      { id: "9", contactName: "Shmee150", contactEmail: "tim@shmee150.com" },
      {
        id: "10",
        contactName: "Vilebrequin",
        contactEmail: "contact@vilebrequin.fr",
      },
      {
        id: "11",
        contactName: "Alex Kersten",
        contactEmail: "alex@carthrottle.com",
      },
      {
        id: "12",
        contactName: "Donut Media",
        contactEmail: "hello@donutmedia.com",
      },
      {
        id: "13",
        contactName: "Top Gear France",
        contactEmail: "contact@topgear.fr",
      },
      {
        id: "14",
        contactName: "Automotive Mike",
        contactEmail: "mike@automotive.com",
      },
    ],
  },
  {
    id: "4",
    name: "Good",
    createdAt: "2024-06-01",
    influencers: [
      {
        id: "15",
        contactName: "Emma Chamberlain",
        contactEmail: "emma@chamberlain.com",
      },
      {
        id: "16",
        contactName: "David Dobrik",
        contactEmail: "david@dobrik.com",
      },
    ],
  },
  {
    id: "5",
    name: "Marketing d'influence",
    createdAt: "2024-04-20",
    influencers: [
      {
        id: "17",
        contactName: "Gary Vaynerchuk",
        contactEmail: "gary@vaynermedia.com",
      },
      {
        id: "18",
        contactName: "Neil Patel",
        contactEmail: "neil@neilpatel.com",
      },
      {
        id: "19",
        contactName: "Rand Fishkin",
        contactEmail: "rand@sparktoro.com",
      },
      {
        id: "20",
        contactName: "Ann Handley",
        contactEmail: "ann@marketingprofs.com",
      },
      {
        id: "21",
        contactName: "Seth Godin",
        contactEmail: "seth@sethgodin.com",
      },
      {
        id: "22",
        contactName: "Mari Smith",
        contactEmail: "mari@marismith.com",
      },
      { id: "23", contactName: "Jay Baer", contactEmail: "jay@jaybaer.com" },
      {
        id: "24",
        contactName: "Amy Porterfield",
        contactEmail: "amy@amyporterfield.com",
      },
      {
        id: "25",
        contactName: "Michael Stelzner",
        contactEmail: "michael@socialmediaexaminer.com",
      },
      {
        id: "26",
        contactName: "Brian Dean",
        contactEmail: "brian@backlinko.com",
      },
    ],
  },
  {
    id: "6",
    name: "Voyage",
    createdAt: "2024-05-15",
    influencers: [
      {
        id: "27",
        contactName: "Nomadic Fanatic",
        contactEmail: "eric@nomadicfanatic.com",
      },
      {
        id: "28",
        contactName: "Kara and Nate",
        contactEmail: "hello@karaandnate.com",
      },
      {
        id: "29",
        contactName: "Drew Binsky",
        contactEmail: "drew@drewbinsky.com",
      },
    ],
  },
  {
    id: "7",
    name: "R&B",
    createdAt: "2024-06-05",
    influencers: [
      { id: "4", contactName: "Dadju", contactEmail: "contact@dadju.com" },
    ],
  },
];

// Plan Elite (compte principal)
export const mockUserAccount: UserAccount = {
  name: "Hugo Expandia",
  email: "hugo@expandia.io",
  plan: {
    name: "Plan Élite",
    renewalDate: "2025-07-27",
    limits: {
      searches: "unlimited",
      profiles: { used: 73, total: 500 },
      users: { used: 0, total: 10 },
    },
    features: [
      "Recherches illimitées",
      "500 profils par mois",
      "10 utilisateurs équipe",
      "Export CSV illimité",
      "Rapports d'audience détaillés",
      "Support prioritaire",
    ],
    price: {
      monthly: 299,
      currency: "EUR",
    },
  },
  billingInfo: {
    company: "Expandia SAS",
    vatNumber: "FR12345678901",
    address: {
      street: "123 Rue de la Paix",
      city: "Paris",
      postalCode: "75001",
      country: "France",
    },
  },
};

// Plan Pro (exemple alternatif)
export const mockUserAccountPro: UserAccount = {
  name: "Marie Dubois",
  email: "marie@agenceinfluence.fr",
  plan: {
    name: "Plan Pro",
    renewalDate: "2024-12-15",
    limits: {
      searches: "unlimited",
      profiles: { used: 45, total: 200 },
      users: { used: 2, total: 5 },
    },
    features: [
      "Recherches illimitées",
      "200 profils par mois",
      "5 utilisateurs équipe",
      "Export CSV",
      "Rapports d'audience",
      "Support standard",
    ],
    price: {
      monthly: 149,
      currency: "EUR",
    },
  },
};

// Plan Starter (exemple alternatif)
export const mockUserAccountStarter: UserAccount = {
  name: "Thomas Martin",
  email: "thomas@startup.com",
  plan: {
    name: "Plan Starter",
    renewalDate: "2024-08-30",
    limits: {
      searches: 100,
      profiles: { used: 28, total: 50 },
      users: { used: 0, total: 1 },
    },
    features: [
      "100 recherches par mois",
      "50 profils par mois",
      "1 utilisateur",
      "Export CSV limité",
      "Rapports basiques",
    ],
    price: {
      monthly: 49,
      currency: "EUR",
    },
  },
};

// Fonctions utilitaires pour récupérer les données
export async function getCurrentUserAccount(): Promise<UserAccount> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));
  // Par défaut, retourner le compte Elite
  return mockUserAccount;
}

export async function updateUserProfile(
  updates: Partial<Pick<UserAccount, "name" | "email">>
): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate API call success
      Object.assign(mockUserAccount, updates);
      resolve(true);
    }, 400);
  });
}

export function changePassword(
  oldPassword: string,
  newPassword: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate password validation
      if (oldPassword === "wrongpassword") {
        reject(new Error("Mot de passe actuel incorrect"));
      } else {
        console.log(`Password changed successfully to: ${newPassword.substring(0, 3)}***`);
        resolve(true);
      }
    }, 600);
  });
}

export function getUsageStats(): Promise<{
  searchesThisMonth: number;
  profilesThisMonth: number;
  topSearchKeywords: string[];
  recentActivity: Array<{
    date: string;
    action: string;
    details: string;
  }>;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        searchesThisMonth: 156,
        profilesThisMonth: 73,
        topSearchKeywords: ["beauté", "gaming", "lifestyle", "food", "tech"],
        recentActivity: [
          {
            date: "2024-07-01",
            action: "Recherche",
            details: "Influenceurs beauté France",
          },
          {
            date: "2024-06-30",
            action: "Export",
            details: "Liste HelloFresh (4 contacts)",
          },
          {
            date: "2024-06-29",
            action: "Rapport débloqué",
            details: "Nabilla Vergara - Analyse audience",
          },
        ],
      });
    }, 300);
  });
}

export async function getInfluencersList(searchTerm?: string): Promise<Influencer[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  
  if (!searchTerm) return mockInfluencers;
  
  return mockInfluencers.filter(
    (influencer) =>
      influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

export async function getInfluencerDetails(id: string): Promise<InfluencerDetails | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockInfluencerDetails[id] || null;
}

export async function getUserLists(): Promise<InfluencerList[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 250));
  return mockLists;
}

export async function getListDetails(id: string): Promise<InfluencerList | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockLists.find((list) => list.id === id) || null;
}

// Interface pour les filtres de recherche
export interface SearchFilters {
  platform?: "instagram" | "youtube" | "tiktok";
  minFollowers?: number;
  maxFollowers?: number;
  minEngagement?: number;
  country?: string;
  verified?: boolean;
  hasEmail?: boolean;
}

// Fonction utilitaire pour générer des données cohérentes
export function generateInfluencerData(
  id: string,
  name: string,
  username: string,
  platform: "instagram" | "youtube" | "tiktok"
): Influencer {
  const followers = Math.floor(Math.random() * 10000000) + 100000; // Entre 100k et 10M
  const baseEngagement = followers * (Math.random() * 0.05 + 0.005); // Entre 0.5% et 5.5%
  const engagement = Math.floor(baseEngagement);
  const engagementRate = Number(((engagement / followers) * 100).toFixed(2));

  const countries = ["FR", "US", "UK", "DE", "ES", "IT", "CA"];
  const country = countries[Math.floor(Math.random() * countries.length)];

  return {
    id,
    name,
    username,
    platform,
    avatar: `/avatars/${username}.jpg`,
    followers,
    engagement,
    engagementRate,
    country,
    verified: Math.random() > 0.3, // 70% de chance d'être vérifié
    email: Math.random() > 0.4 ? `contact@${username}.com` : undefined, // 60% ont un email
    bio: `${name} - Créateur de contenu ${platform}`,
  };
}

// Fonction de recherche et de filtrage
export function searchInfluencers(filters: SearchFilters = {}): Influencer[] {
  return mockInfluencers.filter((influencer) => {
    if (filters.platform && influencer.platform !== filters.platform)
      return false;
    if (filters.minFollowers && influencer.followers < filters.minFollowers)
      return false;
    if (filters.maxFollowers && influencer.followers > filters.maxFollowers)
      return false;
    if (
      filters.minEngagement &&
      influencer.engagementRate < filters.minEngagement
    )
      return false;
    if (filters.country && influencer.country !== filters.country) return false;
    if (
      filters.verified !== undefined &&
      influencer.verified !== filters.verified
    )
      return false;
    if (
      filters.hasEmail !== undefined &&
      !!influencer.email !== filters.hasEmail
    )
      return false;

    return true;
  });
}

// Fonction pour simuler le "déverrouillage" d'un rapport
export function unlockInfluencerReport(
  id: string
): Promise<InfluencerDetails | null> {
  return new Promise((resolve) => {
    // Simuler un délai d'API
    setTimeout(() => {
      resolve(mockInfluencerDetails[id] || null);
    }, 800);
  });
}

// Fonction pour exporter une liste en CSV
export function exportListToCSV(listId: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const list = mockLists.find((l) => l.id === listId);
      if (!list) {
        resolve("");
        return;
      }

      const headers = ["Nom", "Email"];
      const rows = list.influencers.map((inf) => [
        inf.contactName || "",
        inf.contactEmail || "",
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.join(",")),
      ].join("\n");

      resolve(csvContent);
    }, 500);
  });
}

// Fonction pour ajouter un influenceur à une liste
export function addInfluencerToList(
  listId: string,
  influencerId: string
): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate API call - log the action
      console.log(`Adding influencer ${influencerId} to list ${listId}`);
      resolve(true);
    }, 300);
  });
} 