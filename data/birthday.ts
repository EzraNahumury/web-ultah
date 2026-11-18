/* =========================================================================
 *  💌  BIRTHDAY EXPERIENCE — SINGLE SOURCE OF CONTENT
 * =========================================================================
 *  This is the ONLY file you need to edit to personalize the whole website.
 *  Change names, dates, messages, photos and music below.
 *
 *  Lines marked with  ✏️  are the ones you'll most likely want to change.
 *  Nothing here is a real memory, name or date — they are placeholders.
 *  Replace them with your own words.
 *
 *  Photos  →  drop image files in  /public/images/  then set `src` below.
 *  Music   →  drop an audio file in /public/music/   then set `music.src`.
 * ========================================================================= */

export interface GalleryPhoto {
  /** Path under /public, e.g. "/images/moment-01.jpg". Leave null for an elegant placeholder. */
  src: string | null;
  /** Short caption shown under / over the photo. */
  caption: string;
  /** Optional tiny label (a place, a month, a mood…). */
  tag?: string;
  /** Accessible description of the image. */
  alt: string;
}

export interface VideoClip {
  /** Path under /public, e.g. "/video/m1.mp4". */
  src: string;
  /** Still frame shown instantly before the clip streams. */
  poster?: string;
  /** Short caption shown with the clip. */
  caption: string;
  /** Accessible description. */
  alt: string;
}

export interface Reason {
  /** Front of the card. */
  title: string;
  /** Hidden message revealed when the card is opened. */
  note: string;
}

export interface BirthdayConfig {
  recipientName: string;
  senderName: string;

  /** Used for the countdown + hero date. Countdown only shows while the day is still ahead. */
  birthday: {
    month: number; // 1–12
    day: number; // 1–31
    /** How the date reads on screen. */
    displayDate: string;
  };

  opening: {
    eyebrow: string;
    cta: string;
    /** Backdrop style: glowing flower field, a video clip, or a quiet dark glow. */
    backdrop: "flowers" | "video" | "dark";
    /** Short paragraph shown by the CTA. */
    intro: string;
    /** Clips that crossfade as the opening backdrop. [] = plain dark backdrop. */
    backgroundClips: string[];
    /** One short label per clip, shown in the switcher (e.g. "SKIES"). */
    clipLabels: string[];
  };
  hero: {
    greetingPrefix: string;
    subheadline: string;
    /** A photo beside the greeting. Takes priority over videoSrc. null = none. */
    imageSrc: string | null;
    /** A short clip that plays (muted) beside the greeting. null = no video. */
    videoSrc: string | null;
  };
  memories: { title: string; subtitle: string; photos: GalleryPhoto[] };
  videos: { title: string; subtitle: string; items: VideoClip[] };
  reasons: { title: string; subtitle: string; items: Reason[] };
  letter: {
    title: string;
    greeting: string;
    paragraphs: string[];
    signoff: string;
  };
  wish: { title: string; message: string; cta: string; candleCount: number };
  finale: { buildup: string; reveal: string; closing: string };

  /** Ambient background music. Set src to null to hide the sound control. */
  music: { src: string | null; title: string };
}

export const birthday: BirthdayConfig = {
  // ✏️ Who this is for, and who it's from.
  recipientName: "Denis",
  senderName: "Ezra",

  // ✏️ The real birthday. The countdown appears only while it's still ahead.
  birthday: {
    month: 11,
    day: 19,
    displayDate: "November 19th",
  },

  opening: {
    eyebrow: "A little something for someone special.",
    cta: "Open Your Surprise",
    backdrop: "video", // "flowers" | "video" | "dark"
    intro: "A small world, made just for you. Press play when you're ready.",
    // ✏️ Backdrop clip(s). One plays at a time (light). External HD link — may
    //    stop working some day; swap for a local file in /public/video if so.
    backgroundClips: [
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260819_212700_3bb9329b-5c50-4257-a09b-ca85cf3654a3.mp4",
    ],
    clipLabels: ["FILM"],
  },

  hero: {
    greetingPrefix: "Happy Birthday,",
    subheadline:
      "Today is all about celebrating you — and the beautiful person you are.",
    imageSrc: "/images/paper.webp",
    videoSrc: null,
  },

  memories: {
    title: "Little Moments, Beautiful Memories.",
    subtitle:
      "A small collection of the ordinary days that never felt ordinary with you.",
    // ✏️ Add your own photos. Keep `src` null to show a placeholder for now.
    photos: [
      { src: "/images/1.webp", caption: "The quiet ones are my favourite.", tag: "No. 01", alt: "A favourite memory together" },
      { src: "/images/2.webp", caption: "Golden hour, and you.", tag: "No. 02", alt: "A favourite memory together" },
      { src: "/images/3.webp", caption: "Somewhere we'd happily get lost again.", tag: "No. 03", alt: "A favourite memory together" },
      { src: "/images/4.webp", caption: "The day I didn't want to end.", tag: "No. 04", alt: "A favourite memory together" },
      { src: "/images/5.webp", caption: "Just us, nowhere to be.", tag: "No. 05", alt: "A favourite memory together" },
      { src: "/images/6.webp", caption: "Proof that laughing is better with you.", tag: "No. 06", alt: "A favourite memory together" },
      { src: "/images/7.webp", caption: "Every version of us, still my favourite.", tag: "No. 07", alt: "A favourite memory together" },
      { src: "/images/8.webp", caption: "Here's to many more of these.", tag: "No. 08", alt: "A favourite memory together" },
      { src: "/images/9.webp", caption: "My favourite place is next to you.", tag: "No. 09", alt: "A favourite memory together" },
    ],
  },

  videos: {
    title: "A Few Moments In Motion.",
    subtitle:
      "Some moments are too alive to hold still — here they are, just as they happened.",
    // ✏️ Clips live in /public/video/. Add or reorder freely.
    items: [
      { src: "/video/m1.mp4", poster: "/video/posters/m1.jpg", caption: "Caught mid-laugh.", alt: "A video memory together" },
      { src: "/video/m2.mp4", poster: "/video/posters/m2.jpg", caption: "A little clip of us.", alt: "A video memory together" },
      { src: "/video/m3.mp4", poster: "/video/posters/m3.jpg", caption: "Press play — hear us smile.", alt: "A video memory together" },
      { src: "/video/m4.mp4", poster: "/video/posters/m4.jpg", caption: "Just another good day.", alt: "A video memory together" },
      { src: "/video/m5.mp4", poster: "/video/posters/m5.jpg", caption: "The little in-between moments.", alt: "A video memory together" },
      { src: "/video/m6.mp4", poster: "/video/posters/m6.jpg", caption: "Us, exactly as we are.", alt: "A video memory together" },
      { src: "/video/m7.mp4", poster: "/video/posters/m7.jpg", caption: "A moment worth replaying.", alt: "A video memory together" },
    ],
  },

  reasons: {
    title: "A Few Of The Reasons.",
    subtitle: "There are far too many to fit here. Here's a start.",
    // ✏️ Keep these honest and personal. 4–6 works best.
    items: [
      { title: "Your Smile", note: "It's the first thing I picture when I think of a good day. Somehow it makes everything lighter." },
      { title: "Your Kindness", note: "The way you care — quietly, without needing anyone to notice. It changes the room." },
      { title: "The Way You Laugh", note: "Fully, honestly, with your whole self. It's my favourite sound." },
      { title: "Your Beautiful Heart", note: "Gentle and brave at the same time. I learn something from it all the time." },
      { title: "Simply Being You", note: "You never have to try to be remarkable. You just are." },
    ],
  },

  letter: {
    title: "A Letter From My Heart",
    // Lines wrapped in *asterisks* are shown as centred, emphasised beats.
    greeting: "Percaya.",
    paragraphs: [
      "Tentang bagaimana perjalanan kita untuk sampai berada pada titik ini, bahkan menyatukan kehidupan dua insan yang sangat berbeda.",
      "Kebersamaan yang selalu diiringi dengan cinta, sayang, amarah, dan duka di dalamnya. Sebab pada akhirnya, mencintai seseorang bukan hanya tentang menikmati hari-hari yang menyenangkan, tetapi juga tentang bagaimana kita tetap memilih untuk tinggal ketika keadaan tidak selalu berjalan sesuai keinginan.",
      "Perjuangan yang diselimuti dengan doa dan pengharapan yang begitu besar agar bisa sampai pada tujuan yang sama.",
      "Jika di depan nanti akan ada sebuah ombak besar yang menerjang, aku meminta satu hal: jangan sampai kita mempunyai pikiran untuk melompat dari kapal hanya karena ingin menghindarinya. Sebab, tidak semua badai harus dihadapi dengan meninggalkan perjalanan. Ada kalanya kita hanya perlu saling menguatkan, memperbaiki arah, dan belajar mengendalikan kemudi bersama-sama.",
      "Sampai pada akhirnya kita tersadar dan melihat ke belakang bahwa apa yang sudah kita lalui memberikan arti bahwa kita telah cukup kuat untuk melewatinya bersama-sama. Bahwa setiap perdebatan, perbedaan, kesalahpahaman, dan air mata ternyata menjadi bagian dari perjalanan yang membentuk kita menjadi lebih dewasa.",
      "Mungkin di depan nanti akan ada ombak lagi yang menghampiri, tetapi selama kita yakin dan percaya untuk bersama, maka itu bukan sebuah alasan untuk takut menghadapinya.",
      "Terima kasih karena selalu menjaga kepercayaan itu dengan sepenuh hati, meskipun mungkin bagi kita berdua tidak selalu mudah untuk menjaganya agar tetap utuh.",
      "Tugas aku dan kamu hanya saling mempercayai dan menaruh kepercayaan satu sama lain. Sebab, hubungan ini bukan tentang siapa yang paling benar atau siapa yang paling banyak berkorban, melainkan tentang dua orang yang bersedia memahami, memperbaiki, dan bertumbuh tanpa harus kehilangan dirinya masing-masing.",
      "Aku tidak pernah tahu bagaimana akhirnya nanti. Mencintaimu adalah sesuatu tanpa rencana yang harus kutanggung segala konsekuensinya. Aku tidak datang dengan kepastian tentang bagaimana masa depan akan berjalan, tetapi aku datang dengan kesungguhan untuk mengusahakan apa yang sedang kita jalani hari ini.",
      "Aku ingin kita tetap menjadi dua manusia yang tidak berhenti belajar. Belajar memahami hal-hal yang tidak selalu bisa dijelaskan, belajar mendengarkan tanpa terburu-buru menghakimi, belajar meminta maaf tanpa merasa kalah, dan belajar memperbaiki diri tanpa harus menunggu satu sama lain terluka terlebih dahulu.",
      "Aku juga ingin kita tetap mempunyai ruang untuk menjadi diri sendiri. Mengejar mimpi masing-masing, bertumbuh dengan cara masing-masing, dan saling mendukung tanpa merasa harus saling membatasi. Bagiku, hubungan yang baik bukanlah tentang dua orang yang harus selalu berjalan berdampingan setiap saat, tetapi tentang dua orang yang tahu ke mana harus pulang ketika perjalanan masing-masing terasa melelahkan.",
      "*Dan hari ini, di hari bertambahnya usiamu, ada sesuatu yang ingin kusampaikan.*",
      "Selamat bertambah usia, seseorang yang kehadirannya menjadi bagian dari cerita hidupku.",
      "Aku tidak tahu berapa banyak hal yang sudah kamu lalui untuk sampai pada hari ini. Berapa banyak hal yang kamu simpan sendiri, berapa banyak harapan yang belum tercapai, dan berapa banyak perjuangan yang mungkin tidak pernah sempat kamu ceritakan kepada siapa pun.",
      "Namun, aku berharap di usia yang baru ini, hidup memberimu lebih banyak alasan untuk tersenyum. Semoga segala hal yang sedang kamu usahakan menemukan jalannya, segala doa yang kamu panjatkan menemukan jawabannya, dan segala sesuatu yang sedang kamu perjuangkan tidak membuatmu kehilangan kebahagiaan dalam menjalani prosesnya.",
      "Jika suatu hari dunia terasa terlalu berat untuk kamu hadapi, semoga kamu tidak lupa bahwa kamu juga manusia yang boleh merasa lelah. Kamu tidak harus selalu terlihat kuat, tidak harus selalu mempunyai jawaban atas segala sesuatu, dan tidak harus menyelesaikan semuanya sendirian.",
      "Aku mungkin tidak selalu mempunyai solusi untuk setiap persoalanmu, tetapi aku ingin menjadi seseorang yang bersedia mendengarkan ceritamu, memahami diammu, dan menemanimu ketika keadaan tidak sedang baik-baik saja.",
      "Aku tidak ingin hanya hadir ketika kamu sedang bahagia. Aku juga ingin mengenal bagian-bagian dirimu yang mungkin tidak selalu mudah untuk diperlihatkan kepada orang lain. Sebab bagiku, mengenal seseorang bukan hanya tentang mengetahui hal-hal yang menyenangkan darinya, tetapi juga tentang memahami sisi-sisi yang membuatnya menjadi manusia seutuhnya.",
      "Terima kasih sudah menjadi bagian dari perjalanan ini. Terima kasih untuk setiap waktu, percakapan, tawa, perdebatan, dan hal-hal sederhana yang mungkin terlihat biasa, tetapi diam-diam menjadi kenangan yang berharga bagiku.",
      "Aku tidak meminta hubungan yang selalu sempurna, sebab aku tahu kita berdua masih memiliki banyak hal untuk dipelajari. Aku hanya berharap, ketika ada sesuatu yang tidak berjalan sebagaimana mestinya, kita tidak menjadikan perpisahan sebagai jawaban pertama. Semoga kita selalu mempunyai keberanian untuk duduk bersama, membicarakan apa yang perlu diperbaiki, dan menemukan alasan untuk kembali saling memahami.",
      "Jika diizinkan Tuhan untuk bersama, aku bahagia. Namun, lebih dari sekadar berharap untuk memiliki masa depan bersamamu, aku juga berharap kita bisa menjadi pribadi yang lebih baik melalui perjalanan ini.",
      "Pada akhirnya, aku tidak ingin menghitung seberapa lama kita sudah bersama. Aku lebih ingin mengingat seberapa banyak hal yang telah kita pelajari, seberapa jauh kita bertumbuh, dan seberapa tulus kita menjaga apa yang telah dipercayakan kepada kita.",
      "*Selamat ulang tahun.*",
      "Semoga usiamu yang bertambah tidak hanya membawa angka yang baru, tetapi juga kebijaksanaan, ketenangan, dan keberanian untuk menjalani kehidupan.",
      "Mari tetap berjalan, tanpa harus terburu-buru mengetahui bagaimana akhirnya. Kita cukup menjaga apa yang ada hari ini, mengusahakan apa yang bisa diperjuangkan, dan menyerahkan hal-hal yang berada di luar kemampuan kita kepada Tuhan.",
      "Sebab bagiku, cinta bukan sekadar tentang menemukan seseorang untuk diajak berbahagia, tetapi juga tentang menemukan seseorang yang bersedia diajak bertumbuh.",
      "Dan jika perjalanan ini masih panjang, semoga kita tidak kehilangan alasan untuk saling menggenggam, bahkan ketika jalan yang kita lalui tidak selalu mudah.",
    ],
    signoff: "Dengan sepenuh hati,",
  },

  wish: {
    title: "Make A Wish",
    message:
      "May all the beautiful things you wish for find their way to you.",
    cta: "Make a Wish",
    candleCount: 5,
  },

  finale: {
    buildup: "And if I could make one wish today…",
    reveal:
      "I hope the world gives you as much happiness as you bring into mine.",
    closing: "Happy Birthday, My Favourite Person.",
  },

  // ✏️ Add a song: put an .mp3 in /public/music/ and set the path here.
  music: {
    src: null, // e.g. "/music/ambient.mp3"
    title: "Ambient",
  },
};

export default birthday;
