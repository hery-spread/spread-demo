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
  // Influenceurs Gaming
  {
    id: "51",
    name: "Gotaga",
    username: "gotaga",
    platform: "youtube",
    avatar: "/avatars/gotaga.jpg",
    followers: 3200000,
    engagement: 128000,
    engagementRate: 4.0,
    country: "FR",
    verified: true,
    email: "contact@gotaga.tv",
    bio: "Pro gamer et streamer français",
  },
  {
    id: "52",
    name: "Domingo",
    username: "domingo",
    platform: "youtube",
    avatar: "/avatars/domingo.jpg",
    followers: 2800000,
    engagement: 95000,
    engagementRate: 3.4,
    country: "FR",
    verified: true,
    email: "contact@domingo.fr",
    bio: "Gaming et divertissement",
  },
  // Influenceurs Beauté
  {
    id: "53",
    name: "Sananas",
    username: "sananas",
    platform: "youtube",
    avatar: "/avatars/sananas.jpg",
    followers: 2100000,
    engagement: 84000,
    engagementRate: 4.0,
    country: "FR",
    verified: true,
    email: "contact@sananas.fr",
    bio: "Beauté et lifestyle",
  },
  {
    id: "54",
    name: "EnjoyPhoenix Pro",
    username: "enjoyphoenix_pro",
    platform: "youtube",
    avatar: "/avatars/enjoyphoenix2.jpg",
    followers: 3500000,
    engagement: 105000,
    engagementRate: 3.0,
    country: "FR",
    verified: true,
    email: "marie@enjoyphoenix.fr",
    bio: "Beauté, lifestyle et bien-être",
  },
  // Influenceurs TikTok
  {
    id: "55",
    name: "Léa Elui Pro",
    username: "leaelui_pro",
    platform: "tiktok",
    avatar: "/avatars/leaelui2.jpg",
    followers: 13200000,
    engagement: 660000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    email: "contact@leaelui.com",
    bio: "Danseuse et créatrice de contenu",
  },
  {
    id: "56",
    name: "Théo Derville",
    username: "theoderville",
    platform: "tiktok",
    avatar: "/avatars/theoderville.jpg",
    followers: 8900000,
    engagement: 445000,
    engagementRate: 5.0,
    country: "FR",
    verified: true,
    bio: "Humour et divertissement",
  },
  // Influenceurs Lifestyle
  {
    id: "57",
    name: "Caroline Receveur Pro",
    username: "carolinereceveur_pro",
    platform: "instagram",
    avatar: "/avatars/carolinereceveur2.jpg",
    followers: 4200000,
    engagement: 168000,
    engagementRate: 4.0,
    country: "FR",
    verified: true,
    email: "contact@carolinereceveur.fr",
    bio: "Lifestyle, mode et famille",
  },
  // Influenceurs Fitness
  {
    id: "58",
    name: "Tibo InShape Pro",
    username: "tiboinshape_pro",
    platform: "youtube",
    avatar: "/avatars/tiboinshape2.jpg",
    followers: 8100000,
    engagement: 324000,
    engagementRate: 4.0,
    country: "FR",
    verified: true,
    email: "contact@tiboinshape.fr",
    bio: "Fitness et musculation",
  },
  // Influenceurs Cuisine
  {
    id: "59",
    name: "Cyril Lignac Pro",
    username: "cyril_lignac_pro",
    platform: "instagram",
    avatar: "/avatars/cyrillignac2.jpg",
    followers: 1800000,
    engagement: 54000,
    engagementRate: 3.0,
    country: "FR",
    verified: true,
    email: "contact@cyril-lignac.com",
    bio: "Chef cuisinier",
  },
  // Influenceurs Internationaux
  {
    id: "60",
    name: "MrBeast",
    username: "mrbeast",
    platform: "youtube",
    avatar: "/avatars/mrbeast.jpg",
    followers: 172000000,
    engagement: 8600000,
    engagementRate: 5.0,
    country: "US",
    verified: true,
    email: "business@mrbeast.com",
    bio: "Philanthropist and content creator",
  },
  {
    id: "61",
    name: "Charli D'Amelio",
    username: "charlidamelio",
    platform: "tiktok",
    avatar: "/avatars/charlidamelio.jpg",
    followers: 151000000,
    engagement: 7550000,
    engagementRate: 5.0,
    country: "US",
    verified: true,
    email: "contact@charlidamelio.com",
    bio: "Dancer and content creator",
  },
];

// Données détaillées pour 5 influenceurs
export const mockInfluencerDetails: Record<string, InfluencerDetails> = {
  "1": {
    ...mockInfluencers[0],
    audienceUnlocked: true,
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
    performance: [
      {
        date: "2024-01-01",
        followers: 43800000,
        engagement: 0.82,
        reach: 18500000,
      },
      {
        date: "2024-02-01",
        followers: 43950000,
        engagement: 0.85,
        reach: 19200000,
      },
      {
        date: "2024-03-01",
        followers: 44100000,
        engagement: 0.81,
        reach: 18900000,
      },
      {
        date: "2024-04-01",
        followers: 44200000,
        engagement: 0.87,
        reach: 19800000,
      },
      {
        date: "2024-05-01",
        followers: 44250000,
        engagement: 0.83,
        reach: 19300000,
      },
      {
        date: "2024-06-01",
        followers: 44300000,
        engagement: 0.84,
        reach: 19600000,
      },
    ],
    engagementBreakdown: {
      likes: 320000,
      comments: 42000,
      shares: 6800,
      saves: 2200,
    },
    recentPosts: [
      {
        id: "1",
        type: "image",
        thumbnail: "https://picsum.photos/64/64?random=11",
        likes: 180000,
        comments: 2400,
        engagement: 0.84,
        date: "2024-06-25",
      },
      {
        id: "2",
        type: "video",
        thumbnail: "https://picsum.photos/64/64?random=12",
        likes: 220000,
        comments: 3100,
        engagement: 0.91,
        date: "2024-06-23",
      },
      {
        id: "3",
        type: "carousel",
        thumbnail: "https://picsum.photos/64/64?random=13",
        likes: 165000,
        comments: 1900,
        engagement: 0.78,
        date: "2024-06-21",
      },
    ],
  },
  "2": {
    ...mockInfluencers[1],
    audienceUnlocked: true,
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
    performance: [
      {
        date: "2024-01-01",
        followers: 6800000,
        engagement: 4.2,
        reach: 2800000,
      },
      {
        date: "2024-02-01",
        followers: 6850000,
        engagement: 4.5,
        reach: 2950000,
      },
      {
        date: "2024-03-01",
        followers: 6920000,
        engagement: 4.3,
        reach: 2900000,
      },
      {
        date: "2024-04-01",
        followers: 6980000,
        engagement: 4.7,
        reach: 3100000,
      },
      {
        date: "2024-05-01",
        followers: 7050000,
        engagement: 4.4,
        reach: 3000000,
      },
      {
        date: "2024-06-01",
        followers: 7120000,
        engagement: 4.6,
        reach: 3200000,
      },
    ],
    engagementBreakdown: {
      likes: 290000,
      comments: 28000,
      shares: 14000,
      saves: 8000,
    },
    recentPosts: [
      {
        id: "1",
        type: "image",
        thumbnail: "https://picsum.photos/64/64?random=21",
        likes: 180000,
        comments: 2400,
        engagement: 5.2,
        date: "2024-06-25",
      },
      {
        id: "2",
        type: "video",
        thumbnail: "https://picsum.photos/64/64?random=22",
        likes: 220000,
        comments: 3100,
        engagement: 6.1,
        date: "2024-06-23",
      },
      {
        id: "3",
        type: "carousel",
        thumbnail: "https://picsum.photos/64/64?random=23",
        likes: 165000,
        comments: 1900,
        engagement: 4.8,
        date: "2024-06-21",
      },
    ],
  },
  "3": {
    ...mockInfluencers[2],
    audienceUnlocked: true,
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
    performance: [
      {
        date: "2024-01-01",
        followers: 1750000,
        engagement: 4.8,
        reach: 750000,
      },
      {
        date: "2024-02-01",
        followers: 1765000,
        engagement: 5.1,
        reach: 820000,
      },
      {
        date: "2024-03-01",
        followers: 1780000,
        engagement: 4.9,
        reach: 800000,
      },
      {
        date: "2024-04-01",
        followers: 1790000,
        engagement: 5.3,
        reach: 880000,
      },
      {
        date: "2024-05-01",
        followers: 1795000,
        engagement: 5.0,
        reach: 850000,
      },
      {
        date: "2024-06-01",
        followers: 1800000,
        engagement: 5.2,
        reach: 900000,
      },
    ],
    engagementBreakdown: {
      likes: 77000,
      comments: 11000,
      shares: 1800,
      saves: 3200,
    },
    recentPosts: [
      {
        id: "1",
        type: "image",
        thumbnail: "https://picsum.photos/64/64?random=31",
        likes: 48000,
        comments: 720,
        engagement: 5.1,
        date: "2024-06-25",
      },
      {
        id: "2",
        type: "video",
        thumbnail: "https://picsum.photos/64/64?random=32",
        likes: 52000,
        comments: 890,
        engagement: 5.5,
        date: "2024-06-23",
      },
      {
        id: "3",
        type: "carousel",
        thumbnail: "https://picsum.photos/64/64?random=33",
        likes: 43000,
        comments: 650,
        engagement: 4.8,
        date: "2024-06-21",
      },
    ],
  },
  "4": {
    ...mockInfluencers[3],
    audienceUnlocked: true,
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
    performance: [
      {
        date: "2024-01-01",
        followers: 3100000,
        engagement: 4.8,
        reach: 1550000,
      },
      {
        date: "2024-02-01",
        followers: 3120000,
        engagement: 5.1,
        reach: 1620000,
      },
      {
        date: "2024-03-01",
        followers: 3140000,
        engagement: 4.9,
        reach: 1580000,
      },
      {
        date: "2024-04-01",
        followers: 3160000,
        engagement: 5.3,
        reach: 1680000,
      },
      {
        date: "2024-05-01",
        followers: 3180000,
        engagement: 5.0,
        reach: 1600000,
      },
      {
        date: "2024-06-01",
        followers: 3200000,
        engagement: 5.2,
        reach: 1650000,
      },
    ],
    engagementBreakdown: {
      likes: 136000,
      comments: 18000,
      shares: 4800,
      saves: 1200,
    },
    recentPosts: [
      {
        id: "1",
        type: "image",
        thumbnail: "https://picsum.photos/64/64?random=41",
        likes: 88000,
        comments: 1150,
        engagement: 5.2,
        date: "2024-06-25",
      },
      {
        id: "2",
        type: "video",
        thumbnail: "https://picsum.photos/64/64?random=42",
        likes: 92000,
        comments: 1320,
        engagement: 5.5,
        date: "2024-06-23",
      },
      {
        id: "3",
        type: "carousel",
        thumbnail: "https://picsum.photos/64/64?random=43",
        likes: 78000,
        comments: 980,
        engagement: 4.8,
        date: "2024-06-21",
      },
    ],
  },
  "5": {
    ...mockInfluencers[4],
    audienceUnlocked: true,
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
    performance: [
      {
        date: "2024-01-01",
        followers: 18200000,
        engagement: 4.8,
        reach: 9100000,
      },
      {
        date: "2024-02-01",
        followers: 18280000,
        engagement: 5.1,
        reach: 9350000,
      },
      {
        date: "2024-03-01",
        followers: 18350000,
        engagement: 4.9,
        reach: 9200000,
      },
      {
        date: "2024-04-01",
        followers: 18420000,
        engagement: 5.3,
        reach: 9650000,
      },
      {
        date: "2024-05-01",
        followers: 18460000,
        engagement: 5.0,
        reach: 9400000,
      },
      {
        date: "2024-06-01",
        followers: 18500000,
        engagement: 5.2,
        reach: 9700000,
      },
    ],
    engagementBreakdown: {
      likes: 790000,
      comments: 115000,
      shares: 18000,
      saves: 2000,
    },
    recentPosts: [
      {
        id: "1",
        type: "video",
        thumbnail: "https://picsum.photos/64/64?random=51",
        likes: 580000,
        comments: 8200,
        engagement: 5.2,
        date: "2024-06-25",
      },
      {
        id: "2",
        type: "video",
        thumbnail: "https://picsum.photos/64/64?random=52",
        likes: 610000,
        comments: 9150,
        engagement: 5.5,
        date: "2024-06-23",
      },
      {
        id: "3",
        type: "image",
        thumbnail: "https://picsum.photos/64/64?random=53",
        likes: 480000,
        comments: 7200,
        engagement: 4.8,
        date: "2024-06-21",
      },
    ],
  },
};

// Données des listes de base
const baseMockLists: InfluencerList[] = [
  {
    id: "1",
    name: "HelloFresh",
    description: "Campagne HelloFresh - influenceurs lifestyle et cuisine",
    category: "Cuisine",
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
    description: "Créateurs de contenu spécialisés dans la cuisine et la gastronomie",
    category: "Cuisine",
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
    description: "Passionnés d'automobile et de mécanique pour campagne automobile",
    category: "Automobile",
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
    description: "Influenceurs lifestyle et divertissement",
    category: "Lifestyle",
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
    description: "Experts en marketing digital et stratégies d'influence",
    category: "Marketing",
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
    description: "Créateurs de contenu voyage et aventure",
    category: "Voyage",
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
    description: "Artistes R&B et musique urbaine",
    category: "Lifestyle",
    createdAt: "2024-06-05",
    influencers: [
      { id: "4", contactName: "Dadju", contactEmail: "contact@dadju.com" },
    ],
  },
];

// Données des listes étendues avec toutes les listes
export const mockLists: InfluencerList[] = [
  // Listes existantes
  ...baseMockLists,

  // Nouvelles listes
  {
    id: "8",
    name: "Tech Reviewers",
    description:
      "Influenceurs spécialisés dans les tests et reviews de produits technologiques",
    category: "Technologie",
    createdAt: "2024-03-15",
    influencers: [
      { id: "30", contactName: "Micode", contactEmail: "contact@micode.com" },
      {
        id: "31",
        contactName: "Linus Tech Tips",
        contactEmail: "linus@linustechtips.com",
      },
      { id: "32", contactName: "MKBHD", contactEmail: "marques@mkbhd.com" },
      {
        id: "33",
        contactName: "Unbox Therapy",
        contactEmail: "lewis@unboxtherapy.com",
      },
      { id: "34", contactName: "Dave2D", contactEmail: "dave@dave2d.com" },
    ],
  },
  {
    id: "9",
    name: "Fitness Motivation",
    description:
      "Coachs et influenceurs fitness pour campagne équipements sportifs",
    category: "Sport",
    createdAt: "2024-04-10",
    influencers: [
      {
        id: "35",
        contactName: "Tibo InShape",
        contactEmail: "tibo@tiboinshape.com",
      },
      {
        id: "36",
        contactName: "Sissy Mua",
        contactEmail: "sissy@sissymua.com",
      },
      { id: "37", contactName: "Athlean-X", contactEmail: "jeff@athleanx.com" },
      {
        id: "38",
        contactName: "Calisthenic Movement",
        contactEmail: "contact@calisthenic-movement.com",
      },
      {
        id: "39",
        contactName: "FitnessBlender",
        contactEmail: "contact@fitnessblender.com",
      },
    ],
  },
  {
    id: "10",
    name: "Music Artists",
    description:
      "Artistes et producteurs musicaux pour promotion plateforme streaming",
    category: "Musique",
    createdAt: "2024-05-20",
    influencers: [
      { id: "40", contactName: "PNL", contactEmail: "management@pnlmusic.com" },
      {
        id: "41",
        contactName: "Orelsan",
        contactEmail: "orelsan@7thheaven.fr",
      },
      {
        id: "42",
        contactName: "Angèle",
        contactEmail: "angele@angelemusic.com",
      },
      { id: "43", contactName: "Stromae", contactEmail: "contact@stromae.com" },
      {
        id: "44",
        contactName: "Bigflo & Oli",
        contactEmail: "contact@bigfloetoli.com",
      },
    ],
  },
  {
    id: "11",
    name: "Parenting Bloggers",
    description: "Influenceurs parentalité pour campagne produits bébé/enfant",
    category: "Famille",
    createdAt: "2024-02-28",
    influencers: [
      {
        id: "45",
        contactName: "Maman Déborde",
        contactEmail: "contact@mamandeborde.com",
      },
      {
        id: "46",
        contactName: "Papa Positive",
        contactEmail: "papa@papapositive.fr",
      },
      {
        id: "47",
        contactName: "Les Maternelles",
        contactEmail: "contact@lesmaternelles.com",
      },
      {
        id: "48",
        contactName: "Famille Nombreuse",
        contactEmail: "contact@famillenombreuse.com",
      },
    ],
  },
  {
    id: "12",
    name: "Eco-Influencers",
    description: "Influenceurs éco-responsables pour marque durable",
    category: "Écologie",
    createdAt: "2024-06-12",
    influencers: [
      {
        id: "49",
        contactName: "Camille Se Lance",
        contactEmail: "camille@camilleselance.com",
      },
      {
        id: "50",
        contactName: "Julien Vidal",
        contactEmail: "julien@cacommenceparmoi.org",
      },
      {
        id: "51",
        contactName: "Lucie Pinson",
        contactEmail: "lucie@reclaimfinance.org",
      },
      {
        id: "52",
        contactName: "Zero Waste France",
        contactEmail: "contact@zerowastefrance.org",
      },
    ],
  },
  {
    id: "13",
    name: "Luxury Lifestyle",
    description: "Influenceurs luxe et lifestyle haut de gamme",
    category: "Luxe",
    createdAt: "2024-01-25",
    influencers: [
      {
        id: "53",
        contactName: "Luxury Lifestyle",
        contactEmail: "contact@luxurylifestyle.com",
      },
      {
        id: "54",
        contactName: "Rich Kids",
        contactEmail: "contact@richkids.com",
      },
      {
        id: "55",
        contactName: "Monaco Life",
        contactEmail: "contact@monacolife.com",
      },
    ],
  },
  {
    id: "14",
    name: "Pet Influencers",
    description: "Influenceurs animaliers pour marque alimentation animale",
    category: "Animaux",
    createdAt: "2024-03-08",
    influencers: [
      {
        id: "56",
        contactName: "Grumpy Cat",
        contactEmail: "grumpy@grumpycat.com",
      },
      {
        id: "57",
        contactName: "Doug the Pug",
        contactEmail: "doug@dougthepug.com",
      },
      { id: "58", contactName: "Nala Cat", contactEmail: "nala@nalacat.com" },
      { id: "59", contactName: "Jiff Pom", contactEmail: "jiff@jiffpom.com" },
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
  maxEngagement?: number;
  country?: string;
  verified?: boolean;
  hasEmail?: boolean;
  query?: string; // Recherche textuelle
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
    // Filtre par plateforme
    if (filters.platform && influencer.platform !== filters.platform) {
      return false;
    }

    // Filtre par nombre de followers
    if (filters.minFollowers && influencer.followers < filters.minFollowers) {
      return false;
    }
    if (filters.maxFollowers && influencer.followers > filters.maxFollowers) {
      return false;
    }

    // Filtre par taux d'engagement
    if (
      filters.minEngagement &&
      influencer.engagementRate < filters.minEngagement
    ) {
      return false;
    }
    if (
      filters.maxEngagement &&
      influencer.engagementRate > filters.maxEngagement
    ) {
      return false;
    }

    // Filtre par pays
    if (filters.country && influencer.country !== filters.country) {
      return false;
    }

    // Filtre par statut vérifié
    if (
      filters.verified !== undefined &&
      influencer.verified !== filters.verified
    ) {
      return false;
    }

    // Filtre par disponibilité email
    if (filters.hasEmail !== undefined) {
      const hasEmail = !!influencer.email;
      if (hasEmail !== filters.hasEmail) {
        return false;
      }
    }

    // Filtre par recherche textuelle (nom, username ou bio)
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const matchesName = influencer.name.toLowerCase().includes(query);
      const matchesUsername = influencer.username.toLowerCase().includes(query);
      const matchesBio = influencer.bio?.toLowerCase().includes(query);

      if (!matchesName && !matchesUsername && !matchesBio) {
        return false;
      }
    }

    return true;
  });
}

// Ajouter une fonction pour obtenir des suggestions de recherche
export function getSearchSuggestions(query: string): string[] {
  if (!query || query.length < 2) return [];

  const suggestions = new Set<string>();
  const queryLower = query.toLowerCase();

  mockInfluencers.forEach((influencer) => {
    // Suggestions basées sur le nom
    if (influencer.name.toLowerCase().includes(queryLower)) {
      suggestions.add(influencer.name);
    }

    // Suggestions basées sur le username
    if (influencer.username.toLowerCase().includes(queryLower)) {
      suggestions.add(influencer.username);
    }

    // Suggestions basées sur la bio
    if (influencer.bio?.toLowerCase().includes(queryLower)) {
      const words = influencer.bio.split(" ");
      words.forEach((word) => {
        if (word.toLowerCase().includes(queryLower) && word.length > 2) {
          suggestions.add(word);
        }
      });
    }
  });

  return Array.from(suggestions).slice(0, 5);
}

// Ajouter une fonction pour obtenir des statistiques de recherche
export function getSearchStats(): {
  totalInfluencers: number;
  byPlatform: Record<string, number>;
  byCountry: Record<string, number>;
  avgFollowers: number;
  avgEngagement: number;
} {
  const stats = {
    totalInfluencers: mockInfluencers.length,
    byPlatform: {} as Record<string, number>,
    byCountry: {} as Record<string, number>,
    avgFollowers: 0,
    avgEngagement: 0,
  };

  let totalFollowers = 0;
  let totalEngagement = 0;

  mockInfluencers.forEach((influencer) => {
    // Compter par plateforme
    stats.byPlatform[influencer.platform] =
      (stats.byPlatform[influencer.platform] || 0) + 1;

    // Compter par pays
    stats.byCountry[influencer.country] =
      (stats.byCountry[influencer.country] || 0) + 1;

    // Calculer les moyennes
    totalFollowers += influencer.followers;
    totalEngagement += influencer.engagementRate;
  });

  stats.avgFollowers = Math.round(totalFollowers / mockInfluencers.length);
  stats.avgEngagement = Number(
    (totalEngagement / mockInfluencers.length).toFixed(2)
  );

  return stats;
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

// Fonction pour créer une nouvelle liste
export function createUserList(listData: {
  name: string;
  description: string;
  category: string;
}): Promise<InfluencerList> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newList: InfluencerList = {
        id: Date.now().toString(),
        name: listData.name,
        description: listData.description,
        category: listData.category,
        createdAt: new Date().toISOString().split('T')[0],
        influencers: [],
      };
      
      // Simuler l'ajout à la base de données
      mockLists.unshift(newList);
      resolve(newList);
    }, 500);
  });
}

// Fonction pour supprimer une liste
export function deleteUserList(listId: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockLists.findIndex(list => list.id === listId);
      if (index !== -1) {
        mockLists.splice(index, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 300);
  });
}

// Fonction pour supprimer un influenceur d'une liste
export function removeInfluencerFromList(
  listId: string,
  influencerId: string
): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const list = mockLists.find((list) => list.id === listId);
      if (list) {
        const index = list.influencers.findIndex((inf) => inf.id === influencerId);
        if (index !== -1) {
          list.influencers.splice(index, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      } else {
        resolve(false);
      }
    }, 200);
  });
}

// Fonctions utilitaires pour les statistiques des listes
export function getListStatistics() {
  const totalLists = mockLists.length;
  const totalContacts = mockLists.reduce(
    (sum, list) => sum + list.influencers.length,
    0
  );
  const totalCategories = new Set(mockLists.map((list) => list.category)).size;
  const averageContactsPerList = Math.round(totalContacts / totalLists);

  const contactsWithEmail = mockLists.reduce(
    (sum, list) =>
      sum + list.influencers.filter((inf) => inf.contactEmail).length,
    0
  );

  const emailCompletionRate = Math.round(
    (contactsWithEmail / totalContacts) * 100
  );

  const categoryDistribution = mockLists.reduce((acc, list) => {
    acc[list.category] = (acc[list.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostPopularCategory = Object.entries(categoryDistribution).sort(
    ([, a], [, b]) => b - a
  )[0];

  const recentLists = mockLists.filter((list) => {
    const listDate = new Date(list.createdAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return listDate >= thirtyDaysAgo;
  });

  return {
    totalLists,
    totalContacts,
    totalCategories,
    averageContactsPerList,
    emailCompletionRate,
    categoryDistribution,
    mostPopularCategory: mostPopularCategory ? {
      name: mostPopularCategory[0],
      count: mostPopularCategory[1]
    } : null,
    recentListsCount: recentLists.length,
  };
}

// Fonction pour obtenir les listes par catégorie
export function getListsByCategory(): Record<string, InfluencerList[]> {
  return mockLists.reduce((acc, list) => {
    if (!acc[list.category]) {
      acc[list.category] = [];
    }
    acc[list.category].push(list);
    return acc;
  }, {} as Record<string, InfluencerList[]>);
}

// Fonction pour rechercher dans les listes
export async function searchInLists(query: string): Promise<InfluencerList[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = mockLists.filter(
        (list) =>
          list.name.toLowerCase().includes(query.toLowerCase()) ||
          list.description?.toLowerCase().includes(query.toLowerCase()) ||
          list.category.toLowerCase().includes(query.toLowerCase()) ||
          list.influencers.some(
            (inf) =>
              inf.contactName?.toLowerCase().includes(query.toLowerCase()) ||
              inf.contactEmail?.toLowerCase().includes(query.toLowerCase())
          )
      );
      resolve(results);
    }, 300);
  });
}

// Fonction pour dupliquer une liste
export function duplicateUserList(listId: string): Promise<InfluencerList | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const originalList = mockLists.find((list) => list.id === listId);
      if (originalList) {
        const duplicatedList: InfluencerList = {
          ...originalList,
          id: Date.now().toString(),
          name: `${originalList.name} (Copie)`,
          createdAt: new Date().toISOString().split('T')[0],
        };
        mockLists.unshift(duplicatedList);
        resolve(duplicatedList);
      } else {
        resolve(null);
      }
    }, 400);
  });
}

// Fonction pour fusionner plusieurs listes
export function mergeUserLists(
  listIds: string[],
  newListName: string,
  category?: string
): Promise<InfluencerList | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const listsToMerge = mockLists.filter((list) => listIds.includes(list.id));
      if (listsToMerge.length === 0) {
        resolve(null);
        return;
      }

      // Fusionner tous les influenceurs en évitant les doublons
      const mergedInfluencers = new Map();
      listsToMerge.forEach((list) => {
        list.influencers.forEach((influencer) => {
          if (!mergedInfluencers.has(influencer.id)) {
            mergedInfluencers.set(influencer.id, influencer);
          }
        });
      });

      const mergedList: InfluencerList = {
        id: Date.now().toString(),
        name: newListName,
        description: `Liste fusionnée créée à partir de ${listsToMerge.length} listes`,
        category: category || listsToMerge[0].category,
        createdAt: new Date().toISOString().split('T')[0],
        influencers: Array.from(mergedInfluencers.values()),
      };

      // Supprimer les listes originales
      listIds.forEach((listId) => {
        const index = mockLists.findIndex((list) => list.id === listId);
        if (index !== -1) {
          mockLists.splice(index, 1);
        }
      });

      // Ajouter la nouvelle liste fusionnée
      mockLists.unshift(mergedList);
      resolve(mergedList);
    }, 600);
  });
}

// Fonction pour archiver des listes
export function archiveUserLists(listIds: string[]): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Dans un vrai système, on marquerait les listes comme archivées
      // Ici on simule en les supprimant simplement
      let archiveCount = 0;
      listIds.forEach((listId) => {
        const index = mockLists.findIndex((list) => list.id === listId);
        if (index !== -1) {
          mockLists.splice(index, 1);
          archiveCount++;
        }
      });
      resolve(archiveCount > 0);
    }, 300);
  });
}

// Fonction pour marquer des listes comme favorites
export function favoriteUserLists(listIds: string[]): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulation de marquage comme favoris
      // Dans un vrai système, on ajouterait un champ "favorite" à la liste
      console.log(`Marked ${listIds.length} lists as favorites:`, listIds);
      resolve(true);
    }, 200);
  });
}

// Fonction d'export avancé avec options
export function exportListWithOptions(
  listId: string,
  options: {
    format: "csv" | "xlsx" | "json";
    fields: string[];
    includeHeaders: boolean;
    separator: string;
    encoding: string;
    filterEmptyEmails: boolean;
  }
): Promise<{ success: boolean; filename?: string; error?: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const list = mockLists.find((l) => l.id === listId);
      if (!list) {
        resolve({ success: false, error: "Liste non trouvée" });
        return;
      }

      let contacts = list.influencers;
      if (options.filterEmptyEmails) {
        contacts = contacts.filter(
          (c) => c.contactEmail && c.contactEmail.trim() !== ""
        );
      }

      // Simulation de l'export
      const filename = `${list.name.replace(/\s+/g, "_")}_export_${Date.now()}.${options.format}`;
      
      console.log("Export simulé:", {
        filename,
        format: options.format,
        contactsCount: contacts.length,
        fields: options.fields,
        options,
      });

      resolve({ success: true, filename });
    }, 1000);
  });
}

// Fonction d'envoi d'email groupé
export function sendGroupEmail(
  listId: string,
  emailData: {
    subject: string;
    message: string;
    template: string;
    includeContactName: boolean;
    sendTime: "now" | "scheduled";
    scheduledDate?: string;
    scheduledTime?: string;
  }
): Promise<{ success: boolean; sentCount?: number; error?: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const list = mockLists.find((l) => l.id === listId);
      if (!list) {
        resolve({ success: false, error: "Liste non trouvée" });
        return;
      }

      const validEmails = list.influencers.filter(
        (inf) => inf.contactEmail && inf.contactEmail.trim() !== ""
      );

      if (validEmails.length === 0) {
        resolve({ success: false, error: "Aucun email valide trouvé" });
        return;
      }

      // Simulation de l'envoi
      console.log("Email groupé simulé:", {
        listName: list.name,
        recipientCount: validEmails.length,
        subject: emailData.subject,
        sendTime: emailData.sendTime,
        scheduledFor: emailData.scheduledDate && emailData.scheduledTime 
          ? `${emailData.scheduledDate} ${emailData.scheduledTime}`
          : undefined,
      });

      resolve({ success: true, sentCount: validEmails.length });
    }, 1500);
  });
}

// Données de profil utilisateur détaillées
export const mockUserProfile = {
  id: "user-123",
  firstName: "Sophie",
  lastName: "Martin",
  email: "sophie.martin@marketingpro.fr",
  company: "Marketing Pro",
  position: "Directrice Marketing",
  phone: "+33 1 42 68 53 27",
  website: "https://www.marketingpro.fr",
  bio: "Directrice marketing avec 8 ans d'expérience dans le marketing d'influence. Passionnée par les stratégies digitales innovantes et la création de campagnes authentiques qui connectent les marques avec leur audience.",
  avatar: "/avatars/user-profile.jpg",
  createdAt: "2023-03-15",
  lastLogin: "2024-12-20T14:30:00Z",
  emailVerified: true,
  twoFactorEnabled: false,
};

// Préférences de notifications
export const mockNotificationSettings = {
  email: {
    newInfluencers: true,
    weeklyReport: true,
    billing: true,
    systemUpdates: false,
    marketingOffers: false,
  },
  push: {
    newInfluencers: false,
    campaignReminders: true,
    systemAlerts: true,
  },
  sms: {
    importantOnly: false,
    billing: true,
    security: true,
  },
};

// Paramètres de confidentialité
export const mockPrivacySettings = {
  dataCollection: true,
  analytics: true,
  marketing: false,
  profilePublic: false,
  searchHistory: true,
  cookiesAnalytics: true,
  cookiesMarketing: false,
};

// Historique des paiements
export const mockBillingHistory = [
  {
    id: "pay-001",
    date: "2024-12-15",
    amount: 89.00,
    currency: "EUR",
    plan: "Plan Elite",
    status: "paid" as const,
    invoiceUrl: "/invoices/2024-12-15.pdf",
    paymentMethod: "•••• •••• •••• 4242",
  },
  {
    id: "pay-002",
    date: "2024-11-15",
    amount: 89.00,
    currency: "EUR",
    plan: "Plan Elite",
    status: "paid" as const,
    invoiceUrl: "/invoices/2024-11-15.pdf",
    paymentMethod: "•••• •••• •••• 4242",
  },
  {
    id: "pay-003",
    date: "2024-10-15",
    amount: 89.00,
    currency: "EUR",
    plan: "Plan Elite",
    status: "paid" as const,
    invoiceUrl: "/invoices/2024-10-15.pdf",
    paymentMethod: "•••• •••• •••• 4242",
  },
  {
    id: "pay-004",
    date: "2024-09-15",
    amount: 89.00,
    currency: "EUR",
    plan: "Plan Elite",
    status: "paid" as const,
    invoiceUrl: "/invoices/2024-09-15.pdf",
    paymentMethod: "•••• •••• •••• 4242",
  },
];

// Moyens de paiement
export const mockPaymentMethods = [
  {
    id: "card-001",
    type: "visa" as const,
    lastFour: "4242",
    expiryMonth: 12,
    expiryYear: 2025,
    holderName: "Sophie Martin",
    isDefault: true,
    fingerprint: "fp_1234567890",
  },
];

// Fonctions pour récupérer les données utilisateur
export function getUserProfile(): Promise<typeof mockUserProfile> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockUserProfile), 300);
  });
}



export function getNotificationSettings(): Promise<typeof mockNotificationSettings> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockNotificationSettings), 200);
  });
}

export function updateNotificationSettings(data: Partial<typeof mockNotificationSettings>): Promise<typeof mockNotificationSettings> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedSettings = { ...mockNotificationSettings, ...data };
      console.log("Paramètres de notifications mis à jour:", updatedSettings);
      resolve(updatedSettings);
    }, 400);
  });
}

export function getPrivacySettings(): Promise<typeof mockPrivacySettings> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPrivacySettings), 200);
  });
}

export function updatePrivacySettings(data: Partial<typeof mockPrivacySettings>): Promise<typeof mockPrivacySettings> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedSettings = { ...mockPrivacySettings, ...data };
      console.log("Paramètres de confidentialité mis à jour:", updatedSettings);
      resolve(updatedSettings);
    }, 400);
  });
}



export function getBillingHistory(): Promise<typeof mockBillingHistory> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockBillingHistory), 300);
  });
}

export function getPaymentMethods(): Promise<typeof mockPaymentMethods> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPaymentMethods), 200);
  });
}

// Alias pour getUserListById (utilise getListDetails)
export function getUserListById(listId: string): Promise<InfluencerList | null> {
  return getListDetails(listId);
}

// Ajouter à la fin du fichier après les données existantes

// Données de crédits et déblocage de rapports
export const mockCreditsData = {
  totalCredits: 100,
  usedCredits: 45,
  remainingCredits: 55,
  history: [
    {
      date: "2024-01-15",
      action: "unlock_report" as const,
      credits: 2,
      description: "Déblocage rapport @marie_lifestyle",
    },
    {
      date: "2024-01-14",
      action: "search" as const,
      credits: 5,
      description: "Recherche influenceurs mode",
    },
    {
      date: "2024-01-12",
      action: "unlock_report" as const,
      credits: 4,
      description: "Déblocage 2 rapports gaming",
    },
    {
      date: "2024-01-10",
      action: "purchase" as const,
      credits: -50,
      description: "Achat package 50 crédits",
    },
    {
      date: "2024-01-08",
      action: "unlock_report" as const,
      credits: 6,
      description: "Déblocage 3 rapports cuisine",
    },
  ],
};

// Marquer certains influenceurs comme ayant des rapports débloqués
export const mockInfluencersWithUnlock = mockInfluencers.map((inf, index) => ({
  ...inf,
  audienceUnlocked: index % 3 === 0, // 1/3 des influenceurs ont leurs rapports débloqués
  unlockedAt: index % 3 === 0 ? "2024-01-10T10:30:00Z" : undefined,
}));

// Données d'export avec crédits
export const mockExportHistory = [
  {
    id: "export_1",
    listId: "1",
    listName: "Influenceurs Mode",
    format: "csv",
    includeAudienceData: true,
    creditsUsed: 6,
    exportedAt: "2024-01-15T14:30:00Z",
    fileName: "influenceurs_mode_20240115.csv",
    recordsCount: 25,
  },
  {
    id: "export_2", 
    listId: "2",
    listName: "Gaming Creators",
    format: "xlsx",
    includeAudienceData: false,
    creditsUsed: 0,
    exportedAt: "2024-01-12T09:15:00Z",
    fileName: "gaming_creators_20240112.xlsx",
    recordsCount: 18,
  },
];

// Données de partage de rapports
export const mockSharedReports = [
  {
    id: 'share_1',
    influencerId: '1',
    shareType: 'public' as const,
    createdAt: '2024-01-15T10:30:00Z',
    expiresAt: '2024-02-15T10:30:00Z',
    includeFullAudience: true,
    trackingEnabled: true,
    viewCount: 127,
    lastViewedAt: '2024-01-20T14:22:00Z',
    utmParameters: {
      source: 'spread_app',
      medium: 'share',
      campaign: 'growth_hacking',
    },
  },
  {
    id: 'share_2',
    influencerId: '2',
    shareType: 'private' as const,
    createdAt: '2024-01-12T15:45:00Z',
    includeFullAudience: false,
    trackingEnabled: true,
    password: 'securepass123',
    viewCount: 43,
    lastViewedAt: '2024-01-18T09:15:00Z',
  },
  {
    id: 'share_3',
    influencerId: '3',
    shareType: 'public' as const,
    createdAt: '2024-01-18T08:20:00Z',
    expiresAt: '2024-01-25T08:20:00Z',
    includeFullAudience: true,
    trackingEnabled: true,
    viewCount: 89,
    lastViewedAt: '2024-01-22T16:45:00Z',
    utmParameters: {
      source: 'linkedin',
      medium: 'social',
      campaign: 'viral_share',
    },
  },
];

export const mockShareStats = {
  totalViews: 1250,
  uniqueViews: 892,
  clickThroughRate: 12.5,
  conversionRate: 3.2,
  topReferrers: [
    { source: 'Direct', views: 450 },
    { source: 'LinkedIn', views: 320 },
    { source: 'Twitter', views: 180 },
    { source: 'Email', views: 150 },
    { source: 'WhatsApp', views: 120 },
  ],
  viewsOverTime: [
    { date: '2024-01-10', views: 23 },
    { date: '2024-01-11', views: 45 },
    { date: '2024-01-12', views: 67 },
    { date: '2024-01-13', views: 89 },
    { date: '2024-01-14', views: 112 },
    { date: '2024-01-15', views: 134 },
    { date: '2024-01-16', views: 156 },
    { date: '2024-01-17', views: 189 },
    { date: '2024-01-18', views: 203 },
    { date: '2024-01-19', views: 225 },
    { date: '2024-01-20', views: 267 },
  ],
};

// Fonction pour simuler la génération d'un lien de partage
export const generateShareLink = async (shareData: {
  influencerId: string;
  shareType: 'public' | 'private';
  expiresAt?: string;
  includeFullAudience: boolean;
  trackingEnabled: boolean;
}) => {
  // Simuler un délai d'API
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const shareId = `${shareData.influencerId}_${Date.now()}`;
  const baseUrl = 'https://share.spread.com/report';
  const utm = shareData.trackingEnabled 
    ? '?utm_source=spread_app&utm_medium=share&utm_campaign=growth_hacking'
    : '';
  
  return `${baseUrl}/${shareId}${utm}`;
};

// Fonction pour simuler le tracking des vues
export const trackShareView = async (shareId: string, utmParams?: Record<string, string>) => {
  console.log('Tracking share view:', { shareId, utmParams });
  
  // Dans un vrai projet, ça ferait un appel API pour tracker la vue
  // Ici on simule juste le log pour le growth hacking
  
  return {
    success: true,
    viewId: `view_${Date.now()}`,
    timestamp: new Date().toISOString(),
  };
};

// Données mockées pour l'onboarding
export const mockOnboardingData = {
  demoSlots: [
    { id: '1', date: '2024-01-25', time: '09:00', available: true },
    { id: '2', date: '2024-01-25', time: '11:00', available: true },
    { id: '3', date: '2024-01-25', time: '14:00', available: false },
    { id: '4', date: '2024-01-25', time: '16:00', available: true },
    { id: '5', date: '2024-01-26', time: '09:00', available: true },
    { id: '6', date: '2024-01-26', time: '11:00', available: true },
    { id: '7', date: '2024-01-26', time: '15:00', available: true },
    { id: '8', date: '2024-01-29', time: '10:00', available: true },
  ],

  industries: [
    { value: 'fashion', label: 'Mode & Lifestyle' },
    { value: 'beauty', label: 'Beauté & Cosmétiques' },
    { value: 'food', label: 'Food & Boissons' },
    { value: 'tech', label: 'Tech & Innovation' },
    { value: 'fitness', label: 'Sport & Fitness' },
    { value: 'travel', label: 'Voyage & Tourisme' },
    { value: 'gaming', label: 'Gaming & Esport' },
    { value: 'other', label: 'Autre' },
  ],

  goals: [
    'Trouver des micro-influenceurs',
    'Analyser la concurrence',
    'Gérer des campagnes',
    'Mesurer le ROI',
    'Développer ma marque',
    'Recruter des ambassadeurs',
  ],
};

// Données CRM
export const mockCRMContacts = [
  {
    id: 'crm_1',
    name: 'Marie Lifestyle',
    username: 'marie_lifestyle',
    email: 'marie@lifestyle.com',
    phone: '+33 6 12 34 56 78',
    platform: 'instagram' as const,
    followers: 125000,
    avatar: '/avatars/marie.jpg',
    stage: 'negotiating' as const,
    notes: 'Intéressée par une collaboration long-terme. Préfère les produits eco-friendly.',
    source: 'search' as const,
    createdAt: '2024-01-15T10:30:00Z',
    lastContact: '2024-01-20T14:22:00Z',
    nextReminder: '2024-01-25T09:00:00Z',
    tags: ['mode', 'lifestyle', 'eco-friendly'],
    hasVideoCall: true,
    dealValue: 2500,
    probability: 75,
    expectedCloseDate: '2024-02-01',
  },
  {
    id: 'crm_2',
    name: 'Alex Gaming',
    username: 'alex_gaming',
    email: 'alex@gaming.com',
    platform: 'youtube' as const,
    followers: 89000,
    avatar: '/avatars/alex.jpg',
    stage: 'responded' as const,
    notes: 'Répond rapidement, très professionnel. Spécialisé hardware gaming.',
    source: 'list' as const,
    createdAt: '2024-01-12T15:45:00Z',
    lastContact: '2024-01-18T11:15:00Z',
    tags: ['gaming', 'tech', 'hardware'],
    dealValue: 1800,
    probability: 60,
  },
  {
    id: 'crm_3',
    name: 'Sarah Fitness',
    username: 'sarah_fitness',
    email: 'sarah@fitness.com',
    platform: 'instagram' as const,
    followers: 67000,
    avatar: '/avatars/sarah.jpg',
    stage: 'contacted' as const,
    notes: 'Premier contact envoyé. Attente de réponse.',
    source: 'manual' as const,
    createdAt: '2024-01-20T08:30:00Z',
    lastContact: '2024-01-20T08:30:00Z',
    tags: ['fitness', 'health', 'wellness'],
    dealValue: 1200,
    probability: 30,
  },
  {
    id: 'crm_4',
    name: 'Thomas Tech',
    username: 'thomas_tech',
    email: 'thomas@techreview.com',
    phone: '+33 6 98 76 54 32',
    platform: 'youtube' as const,
    followers: 45000,
    avatar: '/avatars/thomas.jpg',
    stage: 'closed' as const,
    notes: 'Deal fermé avec succès. Excellente collaboration.',
    source: 'search' as const,
    createdAt: '2024-01-05T09:15:00Z',
    lastContact: '2024-01-15T16:30:00Z',
    tags: ['tech', 'reviews', 'gadgets'],
    hasVideoCall: true,
    dealValue: 3200,
    probability: 100,
    expectedCloseDate: '2024-01-15',
  },
  {
    id: 'crm_5',
    name: 'Emma Voyage',
    username: 'emma_travel',
    email: 'emma@travelwithemma.fr',
    platform: 'instagram' as const,
    followers: 92000,
    avatar: '/avatars/emma.jpg',
    stage: 'responded' as const,
    notes: 'Intéressée par les destinations européennes. Tarif négociable.',
    source: 'import' as const,
    createdAt: '2024-01-18T14:20:00Z',
    lastContact: '2024-01-22T10:45:00Z',
    nextReminder: '2024-01-26T09:00:00Z',
    tags: ['voyage', 'europe', 'aventure'],
    dealValue: 1600,
    probability: 45,
  },
];

export const mockCRMStats = {
  totalContacts: 15,
  contacted: 6,
  responded: 4,
  negotiating: 3,
  closed: 2,
  responseRate: 67,
  averageResponseTime: 24,
  conversionRate: 13,
};