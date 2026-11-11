import type { ImageMetadata } from 'astro';

/*
 * Every word of project copy below comes from Olivia's own portfolio text or her
 * LinkedIn profile, lightly edited for flow. Nothing is invented: no metrics,
 * clients, outcomes or tools that she has not named herself.
 */

const all = import.meta.glob<{ default: ImageMetadata }>('../assets/work/**/*.webp', { eager: true });
export const img = (slug: string, n: string | number): ImageMetadata => {
  const key = `../assets/work/${slug}/${String(n).padStart(3, '0')}.webp`;
  const mod = all[key];
  if (!mod) throw new Error(`Missing image ${key}`);
  return mod.default;
};

export type Shot = { src: ImageMetadata; alt: string; position?: string };
export type Block =
  | { kind: 'full'; shot: Shot; bleed?: boolean; caption?: string }
  | { kind: 'pair'; shots: [Shot, Shot]; caption?: string }
  | { kind: 'grid'; shots: Shot[]; cols: 2 | 3; caption?: string }
  | { kind: 'album'; shots: Shot[]; title: string; intro?: string }
  | { kind: 'text'; eyebrow?: string; body: string[] }
  | { kind: 'video'; src: string; poster: string; label: string; caption?: string }
  | { kind: 'link'; href: string; label: string; note?: string };

export type Project = {
  slug: string;
  title: string;
  short: string; // index label
  kind: string; // one-line category
  color: string; // signature colour sampled from the work
  ink: string; // readable text colour on `color`
  tint: string; // soft background used around the work
  cover: Shot;
  coverPosition?: string;
  lede: string;
  facts: { label: string; value: string }[];
  blocks: Block[];
};

const s = (slug: string, n: number, alt: string, position?: string): Shot => ({ src: img(slug, n), alt, position });

export const projects: Project[] = [
  {
    slug: 'wrestle-like-a-girl',
    title: 'Wrestle Like a Girl',
    short: 'Wrestle Like a Girl',
    kind: 'Poster series',
    color: '#e6177f',
    ink: '#14060d',
    tint: '#fbe3ef',
    cover: s('_covers', 1, 'Poster reading “Strong is Feminine” in arched green type over a hot pink duotone photo of two wrestlers.'),
    coverPosition: '30% 50%',
    lede: 'A poster series celebrating women in wrestling, using bold typography, powerful imagery, and visual storytelling to challenge stereotypes, promote representation, and empower the next generation of female athletes.',
    facts: [
      { label: 'Discipline', value: 'Poster design, typography' },
      { label: 'Focus', value: 'Visual storytelling' },
      { label: 'Pieces', value: 'Series of three' },
    ],
    blocks: [
      { kind: 'grid', cols: 3, shots: [
        s('wrestle-like-a-girl', 68, '“Strong is Feminine” poster: a hot pink halftone photo of two wrestlers grappling, with the headline arched in neon green.'),
        s('wrestle-like-a-girl', 69, '“Wrestle Like a Girl” poster in pink and green with layered photos of a wrestler mid-move.'),
        s('wrestle-like-a-girl', 70, '“All Heart” poster: a wrestler in a pink singlet cut out against a mint green field with handwritten script.'),
      ] },
      { kind: 'text', eyebrow: 'Approach', body: [
        'Each poster experiments with texture, color, text, and composition to tell the story of women’s wrestling, while staying consistent with the Wrestle Like a Girl brand.',
      ] },
    ],
  },
  {
    slug: 'nec-athletics',
    title: 'NEC Athletics',
    short: 'NEC Athletics',
    kind: 'Print and social campaign',
    color: '#c8102e',
    ink: '#ffffff',
    tint: '#f6e4e6',
    cover: s('_covers', 2, 'GRIMS Football poster: New England College football players charging forward over a red and blue textured background.'),
    lede: 'As part of a cross-disciplinary team of art and marketing majors, I collaborated with my college’s athletics department to design promotional print materials for campus-wide outreach.',
    facts: [
      { label: 'Context', value: 'New England College Athletics' },
      { label: 'Role', value: 'Designer, then Athletics Department intern' },
      { label: 'Deliverables', value: 'Print posters, social graphics' },
    ],
    blocks: [
      { kind: 'full', shot: s('nec-athletics', 42, 'GRIMS Football poster with players in navy and white uniforms rushing toward the viewer, the team name in heavy condensed type.') },
      { kind: 'text', eyebrow: 'Internship', body: [
        'I continued this work through an internship with the school’s Athletics Department, creating social and poster graphics for a variety of occasions and teams.',
      ] },
      { kind: 'grid', cols: 3, shots: [
        s('nec-athletics', 43, '“Match Day” wrestling graphic with an athlete in a red singlet against a red starburst.'),
        s('nec-athletics', 44, '“Red vs Blue Duals” graphic featuring three wrestlers in team singlets.'),
        s('nec-athletics', 45, 'Pilgrims wrestling schedule laid out in red with white type.'),
        s('nec-athletics', 46, '“Red vs Blue Duals” graphic featuring two women wrestlers, split red and blue.'),
        s('nec-athletics', 47, '“Big Weekend Ahead” graphic with athletes from several teams on a red background.'),
        s('nec-athletics', 48, 'Saturday game day schedule listing cross country, golf, volleyball, football, field hockey and soccer.'),
        s('nec-athletics', 49, 'Sunday men’s golf graphic with a golfer mid-swing on red.'),
        s('nec-athletics', 50, '“Fall Festival” alumni and family weekend graphic with an autumn covered bridge, pumpkins and a football.'),
        s('nec-athletics', 51, '“Gameday” graphic with a field hockey player and a football player on red.'),
      ] },
    ],
  },
  {
    slug: 'ymca-camp-massapoag',
    title: 'YMCA Camp Massapoag',
    short: 'YMCA Camp Massapoag',
    kind: 'Media Specialist internship',
    color: '#2e5b45',
    ink: '#ffffff',
    tint: '#e3ece4',
    cover: s('_covers', 3, 'Laughing campers in red life jackets in a canoe on the lake, a counselor smiling behind them.'),
    lede: 'A summer as Media Specialist at YMCA Camp Massapoag: print media design, daily camp photo albums, and videography. It was a chance to grow beyond traditional graphic design and explore composition through different creative disciplines.',
    facts: [
      { label: 'Role', value: 'Media Specialist, summer internship' },
      { label: 'Disciplines', value: 'Print, photography, video' },
      { label: 'Audience', value: 'Camp families' },
    ],
    blocks: [
      { kind: 'text', eyebrow: 'Print', body: [
        'At Camp Massapoag, I designed our main camp sign with placeholder spots for weekly award photos, daily schedules, and weekly updates on themes and camp activities, with the branding of the Y and the color scheme of the summer in mind.',
      ] },
      { kind: 'text', eyebrow: 'Video', body: [
        'I was also tasked with curating video content to share on social media with our camp families throughout the camp off-season.',
      ] },
      { kind: 'link', href: 'https://www.instagram.com/ymcacampmassapoag/', label: 'See the camp’s Instagram', note: '@ymcacampmassapoag' },
      { kind: 'album', title: 'From the daily albums', intro: 'Photographs from a summer of daily camp albums: the waterfront, the woods, and everything in between.', shots: [
        s('ymca-camp-massapoag', 85, 'Campers laughing in a canoe, wearing red life jackets.'),
        s('ymca-camp-massapoag', 71, 'A group of campers crowding around an activity on the grass.'),
        s('ymca-camp-massapoag', 72, 'Two campers playing a giant four-in-a-row game.'),
        s('ymca-camp-massapoag', 73, 'A camper grinning on a swing.'),
        s('ymca-camp-massapoag', 74, 'Two campers talking outside a cabin.'),
        s('ymca-camp-massapoag', 75, 'A camper in a helmet climbing the rock wall.'),
        s('ymca-camp-massapoag', 76, 'Campers racing across the field.'),
        s('ymca-camp-massapoag', 77, 'Campers working on a craft at a picnic table.'),
        s('ymca-camp-massapoag', 78, 'A camper stepping into the lake.'),
        s('ymca-camp-massapoag', 79, 'Many hands working together on a rope challenge.'),
        s('ymca-camp-massapoag', 80, 'Campers huddled close during a team challenge.'),
        s('ymca-camp-massapoag', 81, 'A camper climbing a rope in the trees.'),
        s('ymca-camp-massapoag', 82, 'Campers listening together in a group.'),
        s('ymca-camp-massapoag', 83, 'A camper pulling himself up beside a tree.'),
        s('ymca-camp-massapoag', 84, 'Campers in life jackets lined up in a canoe.'),
        s('ymca-camp-massapoag', 86, 'Campers working through a team challenge in the woods.'),
        s('ymca-camp-massapoag', 87, 'A camper in a baseball jersey crouched in the sand.'),
        s('ymca-camp-massapoag', 88, 'A camper kicking the ball in the gaga pit.'),
        s('ymca-camp-massapoag', 89, 'A counselor pointing the way through the pines.'),
        s('ymca-camp-massapoag', 90, 'A swimmer in goggles at the edge of the dock.'),
        s('ymca-camp-massapoag', 91, 'Campers leaping off the dock into the lake.'),
        s('ymca-camp-massapoag', 92, 'Campers playing on the sand court.'),
        s('ymca-camp-massapoag', 93, 'A counselor in a life jacket at the waterfront.'),
        s('ymca-camp-massapoag', 94, 'A counselor and camper sharing a hug.'),
        s('ymca-camp-massapoag', 95, 'A camper smiling mid-swing.'),
        s('ymca-camp-massapoag', 96, 'A camper climbing out of the lake onto the dock.'),
        s('ymca-camp-massapoag', 97, 'Campers sitting together on the dock.'),
        s('ymca-camp-massapoag', 98, 'A camper leaning out of a school bus window.'),
        s('ymca-camp-massapoag', 99, 'A counselor waving beside the school bus.'),
        s('ymca-camp-massapoag', 100, 'Two campers in camp shirts embracing.'),
        s('ymca-camp-massapoag', 101, 'A camper in an orange rain jacket under a clear umbrella.'),
        s('ymca-camp-massapoag', 102, 'Campers leaping in the gaga pit.'),
        s('ymca-camp-massapoag', 103, 'A camper at an activity station.'),
        s('ymca-camp-massapoag', 104, 'A camper getting his shirt signed by a friend.'),
        s('ymca-camp-massapoag', 105, 'A camper performing in front of the group.'),
        s('ymca-camp-massapoag', 106, 'A counselor juggling tennis balls.'),
        s('ymca-camp-massapoag', 107, 'A counselor wearing a stack of hats.'),
        s('ymca-camp-massapoag', 108, 'A counselor in a “Role Model” staff shirt.'),
        s('ymca-camp-massapoag', 109, 'A camper looking down at a craft in her hands.'),
        s('ymca-camp-massapoag', 110, 'A camper signing a friend’s shirt.'),
        s('ymca-camp-massapoag', 111, 'Campers sitting together on the pavement.'),
        s('ymca-camp-massapoag', 112, 'A camper signing a shirt with a marker.'),
        s('ymca-camp-massapoag', 113, 'A camper painting a group banner.'),
        s('ymca-camp-massapoag', 114, 'A camper in a light blue dress among the trees.'),
        s('ymca-camp-massapoag', 115, 'A camper kneeling on a paddleboard.'),
        s('ymca-camp-massapoag', 116, 'A camper on a paddleboard near the shore.'),
        s('ymca-camp-massapoag', 117, 'A camper standing at the edge of the lake.'),
        s('ymca-camp-massapoag', 118, 'A camper in a signed orange shirt.'),
        s('ymca-camp-massapoag', 119, 'Two campers paddling a canoe.'),
      ] },
    ],
  },
  {
    slug: 'skipittechnology',
    title: 'SkipIt Technology',
    short: 'SkipIt Technology',
    kind: 'Brand identity, motion and web',
    color: '#3046b8',
    ink: '#ffffff',
    tint: '#e4e9fb',
    cover: s('_covers', 4, '“Behind SkipIt” graphic: the SkipIt wordmark on a retro television with hand-drawn arrows and stars in blue.'),
    lede: 'SkipIt is a product that helps viewers avoid scenes they find uncomfortable or triggering by detecting sensitive content in movies and shows, then automatically skipping or warning about it.',
    facts: [
      { label: 'Discipline', value: 'Brand identity, motion, web' },
      { label: 'Tools', value: 'After Effects, Figma' },
      { label: 'Deliverables', value: 'Motion logo, website mockup, social' },
    ],
    blocks: [
      { kind: 'video', src: '/media/skipit-motion-logo.mp4', poster: '/media/skipit-motion-logo-poster.jpg', label: 'SkipIt motion logo', caption: 'Motion logo, built in Adobe After Effects by animating the core shapes and typography.' },
      { kind: 'pair', shots: [
        s('skipittechnology', 56, '“Skip scenes, not stories.” web header with a blue retro television.'),
        s('skipittechnology', 57, '“Your comfort matters.” web section on a deep blue gradient.'),
      ] },
      { kind: 'full', shot: s('skipittechnology', 59, '“How it Works” website section showing three steps: set your triggers, scenes detected, skip or dismiss.') },
      { kind: 'pair', shots: [
        s('skipittechnology', 58, '“Trauma Informed Tech” section with personalization features and playful icons.'),
        s('skipittechnology', 60, '“Market Snapshot” slide with market size figures in stacked circles over a camera.'),
      ] },
      { kind: 'text', eyebrow: 'Website', body: [
        'Using Figma, I developed a mockup of the product website, as well as showcasing the UI features of the application.',
      ] },
      { kind: 'link', href: 'https://www.figma.com/proto/kqYyIGCWxkreFPLCVFDrSl/Skip-It-Tech-Website-Redesign?node-id=21-4&starting-point-node-id=21%3A4', label: 'Open the website prototype', note: 'Figma' },
      { kind: 'grid', cols: 3, shots: [
        s('skipittechnology', 61, '“Behind SkipIt” social graphic with the wordmark on a television screen.'),
        s('skipittechnology', 62, '“How it Works” social graphic with a retro TV and torn paper textures.'),
        s('skipittechnology', 63, 'Three-step social graphic: pick what to skip, let SkipIt do the work, watch without worry.'),
      ] },
    ],
  },
  {
    slug: 'artkitect-magazine',
    title: 'Artkitect Magazine',
    short: 'Artkitect Magazine',
    kind: 'Editorial design',
    color: '#ff9b62',
    ink: '#1b1410',
    tint: '#fde9dc',
    cover: s('_covers', 5, 'Artkitect magazine cover with an industrial building wrapped in greenery, lying on an orange surface.'),
    lede: 'A full-length magazine issue centered on contemporary architecture, designed entirely in Adobe InDesign.',
    facts: [
      { label: 'Discipline', value: 'Editorial design, layout' },
      { label: 'Tools', value: 'Adobe InDesign' },
      { label: 'Format', value: 'Full-length magazine issue' },
    ],
    blocks: [
      { kind: 'full', shot: s('artkitect-magazine', 12, 'Artkitect magazine cover mockup on orange: “Re-imagining Post Industrial Landscapes Through the Lens of Sustainable Development.”') },
      { kind: 'pair', shots: [
        s('artkitect-magazine', 13, 'Open magazine showing a feature opening spread with a tall building photograph.'),
        s('artkitect-magazine', 14, 'Open magazine showing an interior text spread with pull quotes.'),
      ] },
      { kind: 'full', shot: s('artkitect-magazine', 15, 'Feature opening spread: a dark glass tower beside the headline “Sustainable Development” set in green and orange.') },
      { kind: 'full', shot: s('artkitect-magazine', 16, 'Interior spread with multi-column body text, a pull quote and architectural photographs.') },
    ],
  },
  {
    slug: 'futura-type-specimen',
    title: 'Futura! Type Specimen',
    short: 'Futura!',
    kind: 'Type specimen book',
    color: '#e88bbd',
    ink: '#1f0c16',
    tint: '#fbe9f1',
    cover: s('_covers', 6, 'Two pink Futura! specimen books stacked on a pale yellow background.'),
    lede: 'This project explores the geometric elegance and modernist legacy of the Futura typeface through a comprehensive type specimen book, designed to showcase the font’s versatility across weights, sizes, and applications.',
    facts: [
      { label: 'Discipline', value: 'Typography, book design' },
      { label: 'Subject', value: 'The Futura typeface' },
      { label: 'Format', value: 'Specimen book' },
    ],
    blocks: [
      { kind: 'pair', shots: [
        s('futura-type-specimen', 29, 'Futura! cover: oversized lowercase letters in cream on pink.'),
        s('futura-type-specimen', 37, 'Futura! monogram stamp in pink on cream.'),
      ] },
      { kind: 'full', shot: s('futura-type-specimen', 30, 'Spread repeating the lowercase a in many weights beside the Futura! title.') },
      { kind: 'full', shot: s('futura-type-specimen', 31, 'Table of contents spread set vertically in pink and cream.') },
      { kind: 'full', shot: s('futura-type-specimen', 32, '“Anatomy of Geometry” spread breaking down Futura’s circular construction.') },
      { kind: 'full', shot: s('futura-type-specimen', 33, 'History of Futura spread with a large numeral and timeline set in pink.') },
      { kind: 'pair', shots: [
        s('futura-type-specimen', 34, '“…and it’s not made of cheese” spread with a crescent moon drawn from type.'),
        s('futura-type-specimen', 35, '“Transformation” repeated in stacked weights beside glyphs.'),
      ] },
      { kind: 'full', shot: s('futura-type-specimen', 36, 'Numerals spread scattered in cream circles across pink.') },
    ],
  },
  {
    slug: 'vector-illustration',
    title: 'Vector Illustration',
    short: 'Vector Illustration',
    kind: 'Illustrated poster series',
    color: '#f2c12e',
    ink: '#1d1405',
    tint: '#fdf3d3',
    cover: s('_covers', 7, 'Two vector posters of profile faces in magenta and yellow, lying overlapped on pink.'),
    lede: 'This two-piece poster series explores the theme of transformation through bold vector illustration.',
    facts: [
      { label: 'Discipline', value: 'Vector illustration' },
      { label: 'Theme', value: 'Transformation' },
      { label: 'Pieces', value: 'Series of two' },
    ],
    blocks: [
      { kind: 'pair', shots: [
        s('vector-illustration', 64, 'First poster: a magenta profile face dissolving into a second face in yellow.'),
        s('vector-illustration', 65, 'Second poster: the mirrored composition, yellow and magenta reversed.'),
      ] },
      { kind: 'full', shot: s('vector-illustration', 66, 'Both posters side by side, framed on a magenta wall.') },
      { kind: 'full', shot: s('vector-illustration', 67, 'Both posters printed and overlapping on a pink surface.') },
    ],
  },
  {
    slug: 'poster-design',
    title: 'Poster Design',
    short: 'Poster Design',
    kind: 'Experimental type and information posters',
    color: '#7e5fb3',
    ink: '#ffffff',
    tint: '#ece6f5',
    cover: s('_covers', 8, 'Block Sans poster in navy, folded and lying on a purple surface.'),
    lede: 'This experimental typeface was created using FontStruct’s grid-based editor, with each character built from uniform cubes.',
    facts: [
      { label: 'Discipline', value: 'Type design, poster design' },
      { label: 'Tools', value: 'FontStruct' },
      { label: 'Pieces', value: 'Block Sans, Mint series' },
    ],
    blocks: [
      { kind: 'pair', shots: [
        s('poster-design', 52, 'Block Sans poster mockup on purple.'),
        s('poster-design', 53, 'Block Sans poster: modular block letterforms and text columns on navy.'),
      ] },
      { kind: 'text', eyebrow: 'Block Sans', body: [
        'The design emphasizes modularity and spatial logic: every letterform is engineered to stack cleanly within a grid, allowing for vertical and horizontal compositions without disrupting alignment.',
      ] },
      { kind: 'text', eyebrow: 'Mint', body: [
        'I also developed informational posters on mint as a medicinal herb, using two different aesthetics to appeal to different demographics.',
      ] },
      { kind: 'pair', shots: [
        s('poster-design', 54, 'Mint poster in soft greens with blurred leaf circles and a script headline.'),
        s('poster-design', 55, '“Mediterranean Medicine” mint poster with oversized geometric letters in deep green.'),
      ] },
    ],
  },
  {
    slug: 'espresso-yourself',
    title: 'Espresso Yourself!',
    short: 'Espresso Yourself!',
    kind: 'Concept brand and packaging',
    color: '#6a2c12',
    ink: '#fbeee2',
    tint: '#f2e4d8',
    cover: s('_covers', 9, 'Three Espresso Yourself! cans, Martini, Caramel and Mocha, on a warm tan shelf.'),
    lede: 'Espresso Yourself! is a conceptual branding and label design project for a spiked coffee company.',
    facts: [
      { label: 'Discipline', value: 'Branding, packaging' },
      { label: 'Deliverables', value: 'Labels, pitch deck' },
      { label: 'Type', value: 'Concept brand' },
    ],
    blocks: [
      { kind: 'full', shot: s('espresso-yourself', 28, 'Three Espresso Yourself! cans in brown, caramel and cream on a tan shelf.') },
      { kind: 'text', eyebrow: 'Process', body: [
        'After establishing the product brief, I designed the full set of labels and assembled a cohesive pitch deck to present the concept.',
      ] },
      { kind: 'pair', shots: [
        s('espresso-yourself', 23, 'Pitch deck slide showing the Espresso Yourself! logo variations on burnt orange.'),
        s('espresso-yourself', 24, 'Pitch deck slide with the brand’s three cocktail glass colours and their values.'),
      ] },
      { kind: 'pair', shots: [
        s('espresso-yourself', 25, 'Typography slide pairing Chikoria Regular with Futura Book.'),
        s('espresso-yourself', 26, 'Mood board slide with coffee, cocktail and texture photography.'),
      ] },
      { kind: 'full', shot: s('espresso-yourself', 27, 'Label flats for Mocha, Caramel and Martini alongside a can mockup.') },
    ],
  },
  {
    slug: 'kiwi-app-interface',
    title: 'Kiwi App Interface',
    short: 'Kiwi',
    kind: 'App interface',
    color: '#3f9a5b',
    ink: '#06170c',
    tint: '#e2f2e5',
    cover: s('_covers', 10, 'Kiwi app screens in soft greens: a dietary tracker, a food checklist and settings.'),
    lede: 'Kiwi is a prototype app designed to make digestive health tracking simple and approachable. Built in Adobe XD.',
    facts: [
      { label: 'Discipline', value: 'UX and UI design' },
      { label: 'Tools', value: 'Adobe XD' },
      { label: 'Process', value: 'Research, wireframes, prototype' },
    ],
    blocks: [
      { kind: 'full', shot: s('kiwi-app-interface', 38, 'Kiwi phone mockups on green showing the home and tracking screens.') },
      { kind: 'text', eyebrow: 'Process', body: [
        'The design process included user research, wireframing, prototyping, and peer feedback to ensure accessibility and ease of use.',
        'The outcome demonstrates how thoughtful UX and UI design can empower users to understand their health patterns through a clean, supportive interface.',
      ] },
      { kind: 'link', href: 'https://xd.adobe.com/view/a519783b-33fd-4d59-98a5-974cb3b789dc-f04a/?fullscreen', label: 'View the interactive prototype', note: 'Adobe XD' },
      { kind: 'full', shot: s('kiwi-app-interface', 39, 'Kiwi treatment screens: customise treatments and log symptoms.') },
      { kind: 'pair', shots: [
        s('kiwi-app-interface', 40, 'Kiwi food tracking screens with a checklist of foods.'),
        s('kiwi-app-interface', 41, 'Kiwi messaging screen for contacting a medical practitioner.'),
      ] },
    ],
  },
  {
    slug: 'centerforbiologicaldiversity',
    title: 'Center for Biological Diversity',
    short: 'Center for Biological Diversity',
    kind: 'Logo redesign',
    color: '#3db5e6',
    ink: '#06212c',
    tint: '#e1f3fb',
    cover: s('_covers', 11, 'White T-shirt printed with the redesigned CBD logo: a green frog inside a sky blue C.'),
    lede: 'I reimagined the Center for Biological Diversity’s frog logo with clarity and scalability in mind. The original mark, while expressive, struggled at smaller sizes and across digital platforms.',
    facts: [
      { label: 'Discipline', value: 'Logo and identity design' },
      { label: 'Focus', value: 'Clarity, scalability' },
      { label: 'Deliverables', value: 'Mark, guidelines, mockups' },
    ],
    blocks: [
      { kind: 'full', shot: s('centerforbiologicaldiversity', 17, 'The redesigned CBD logo: a green frog perched inside a sky blue C, with the full name beneath.') },
      { kind: 'pair', shots: [
        s('centerforbiologicaldiversity', 18, 'Logo variations: stacked, horizontal and icon-only versions.'),
        s('centerforbiologicaldiversity', 19, 'Mission statement page beside a large version of the C and frog mark.'),
      ] },
      { kind: 'pair', shots: [
        s('centerforbiologicaldiversity', 20, 'Approved colours and typography guidelines.'),
        s('centerforbiologicaldiversity', 21, 'Logo scaling guide showing the mark at decreasing sizes.'),
      ] },
      { kind: 'full', shot: s('centerforbiologicaldiversity', 22, 'Mockups of the new mark on a T-shirt and business cards.') },
    ],
  },
];

export const bySlug = (slug: string) => projects.find((p) => p.slug === slug)!;
export const neighbours = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return { prev: projects[(i - 1 + projects.length) % projects.length], next: projects[(i + 1) % projects.length], index: i };
};
