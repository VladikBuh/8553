export type TravlPiinsAmfindsQuizQuestion = {
  travlPiinsAmfindsId: string;
  travlPiinsAmfindsEmoji: string;
  travlPiinsAmfindsPrompt: string;
  travlPiinsAmfindsOptions: [string, string, string, string];
  travlPiinsAmfindsCorrectIndex: number;
  travlPiinsAmfindsExplanation: string;
};

export const travlPiinsAmfindsQuizQuestions: TravlPiinsAmfindsQuizQuestion[] = [
  {
    travlPiinsAmfindsId: 'q01',
    travlPiinsAmfindsEmoji: '🚣',
    travlPiinsAmfindsPrompt:
      'Which city is famous for canals, gondolas, and the annual Carnival with elaborate masks?',
    travlPiinsAmfindsOptions: ['Prague', 'Venice', 'Lisbon', 'Bruges'],
    travlPiinsAmfindsCorrectIndex: 1,
    travlPiinsAmfindsExplanation:
      'Venice is known for its canals, gondolas, historic bridges, and Carnival masks.',
  },
  {
    travlPiinsAmfindsId: 'q02',
    travlPiinsAmfindsEmoji: '🗼',
    travlPiinsAmfindsPrompt:
      'Which landmark was originally built as a temporary structure for the 1889 World’s Fair?',
    travlPiinsAmfindsOptions: [
      'Eiffel Tower',
      'Colosseum',
      'Tower Bridge',
      'Burj Khalifa',
    ],
    travlPiinsAmfindsCorrectIndex: 0,
    travlPiinsAmfindsExplanation:
      'The Eiffel Tower was built for the 1889 Exposition Universelle in Paris and later became the city’s most famous symbol.',
  },
  {
    travlPiinsAmfindsId: 'q03',
    travlPiinsAmfindsEmoji: '🏜️',
    travlPiinsAmfindsPrompt:
      'In which country can travelers visit the ancient city of Petra, carved into rose-colored rock?',
    travlPiinsAmfindsOptions: ['Egypt', 'Morocco', 'Jordan', 'Tunisia'],
    travlPiinsAmfindsCorrectIndex: 2,
    travlPiinsAmfindsExplanation:
      'Petra is located in Jordan and is famous for its rock-cut architecture, especially the Treasury.',
  },
  {
    travlPiinsAmfindsId: 'q04',
    travlPiinsAmfindsEmoji: '🌸',
    travlPiinsAmfindsPrompt:
      'Which tradition is strongly connected with Japan’s spring season?',
    travlPiinsAmfindsOptions: [
      'Tomato throwing festival',
      'Cherry blossom viewing',
      'Highland dancing',
      'Lantern boat racing',
    ],
    travlPiinsAmfindsCorrectIndex: 1,
    travlPiinsAmfindsExplanation:
      'Hanami, or cherry blossom viewing, is a well-known Japanese spring tradition.',
  },
  {
    travlPiinsAmfindsId: 'q05',
    travlPiinsAmfindsEmoji: '🕌',
    travlPiinsAmfindsPrompt:
      'Which famous monument in India was built as a symbol of love?',
    travlPiinsAmfindsOptions: [
      'Qutub Minar',
      'Hawa Mahal',
      'Red Fort',
      'Taj Mahal',
    ],
    travlPiinsAmfindsCorrectIndex: 3,
    travlPiinsAmfindsExplanation:
      'The Taj Mahal was built by Emperor Shah Jahan in memory of his wife Mumtaz Mahal.',
  },
  {
    travlPiinsAmfindsId: 'q06',
    travlPiinsAmfindsEmoji: '⛪',
    travlPiinsAmfindsPrompt:
      'Which city is home to the Sagrada Família, the unfinished basilica designed by Antoni Gaudí?',
    travlPiinsAmfindsOptions: ['Barcelona', 'Madrid', 'Valencia', 'Seville'],
    travlPiinsAmfindsCorrectIndex: 0,
    travlPiinsAmfindsExplanation:
      'The Sagrada Família is one of Barcelona’s most iconic landmarks and a masterpiece of Gaudí’s architecture.',
  },
  {
    travlPiinsAmfindsId: 'q07',
    travlPiinsAmfindsEmoji: '💙',
    travlPiinsAmfindsPrompt:
      'Which place is known for blue-painted streets and buildings?',
    travlPiinsAmfindsOptions: ['Chefchaouen', 'Dubrovnik', 'Nice', 'Porto'],
    travlPiinsAmfindsCorrectIndex: 0,
    travlPiinsAmfindsExplanation:
      'Chefchaouen in Morocco is famous for its blue walls, doors, and narrow streets.',
  },
  {
    travlPiinsAmfindsId: 'q08',
    travlPiinsAmfindsEmoji: '💀',
    travlPiinsAmfindsPrompt:
      'Which country is associated with the Day of the Dead celebration?',
    travlPiinsAmfindsOptions: ['Brazil', 'Mexico', 'Peru', 'Spain'],
    travlPiinsAmfindsCorrectIndex: 1,
    travlPiinsAmfindsExplanation:
      'Día de los Muertos is a Mexican tradition honoring departed loved ones with altars, flowers, food, and colorful decorations.',
  },
  {
    travlPiinsAmfindsId: 'q09',
    travlPiinsAmfindsEmoji: '🐠',
    travlPiinsAmfindsPrompt:
      'Which natural wonder is the world’s largest coral reef system?',
    travlPiinsAmfindsOptions: [
      'Belize Barrier Reef',
      'Red Sea Reef',
      'Great Barrier Reef',
      'New Caledonia Reef',
    ],
    travlPiinsAmfindsCorrectIndex: 2,
    travlPiinsAmfindsExplanation:
      'The Great Barrier Reef is located off the coast of Australia and is the largest coral reef system in the world.',
  },
  {
    travlPiinsAmfindsId: 'q10',
    travlPiinsAmfindsEmoji: '🚶',
    travlPiinsAmfindsPrompt:
      'Which city is famous for the Shibuya Crossing, one of the world’s busiest pedestrian crossings?',
    travlPiinsAmfindsOptions: ['Seoul', 'Tokyo', 'Shanghai', 'Singapore'],
    travlPiinsAmfindsCorrectIndex: 1,
    travlPiinsAmfindsExplanation:
      'Shibuya Crossing is located in Tokyo and is known for its huge crowds and bright city lights.',
  },
  {
    travlPiinsAmfindsId: 'q11',
    travlPiinsAmfindsEmoji: '🏛️',
    travlPiinsAmfindsPrompt:
      'Which landmark is located in Rome and was once used for gladiator contests?',
    travlPiinsAmfindsOptions: [
      'Pantheon',
      'Colosseum',
      'Trevi Fountain',
      'Spanish Steps',
    ],
    travlPiinsAmfindsCorrectIndex: 1,
    travlPiinsAmfindsExplanation:
      'The Colosseum is an ancient Roman amphitheater where gladiator games and public spectacles were held.',
  },
  {
    travlPiinsAmfindsId: 'q12',
    travlPiinsAmfindsEmoji: '🌷',
    travlPiinsAmfindsPrompt:
      'Which country is famous for the tulip fields near Keukenhof?',
    travlPiinsAmfindsOptions: ['Belgium', 'Denmark', 'Netherlands', 'Switzerland'],
    travlPiinsAmfindsCorrectIndex: 2,
    travlPiinsAmfindsExplanation:
      'The Netherlands is famous for its colorful spring tulip fields and flower gardens.',
  },
  {
    travlPiinsAmfindsId: 'q13',
    travlPiinsAmfindsEmoji: '🗽',
    travlPiinsAmfindsPrompt:
      'Which famous statue stands on Liberty Island in New York Harbor?',
    travlPiinsAmfindsOptions: [
      'Christ the Redeemer',
      'Statue of Liberty',
      'The Thinker',
      'Angel of the North',
    ],
    travlPiinsAmfindsCorrectIndex: 1,
    travlPiinsAmfindsExplanation:
      'The Statue of Liberty is one of the most recognizable symbols of the United States.',
  },
  {
    travlPiinsAmfindsId: 'q14',
    travlPiinsAmfindsEmoji: '🎨',
    travlPiinsAmfindsPrompt:
      'Which city is known for colorful houses along canals and lace-making traditions on the island of Burano?',
    travlPiinsAmfindsOptions: ['Venice', 'Naples', 'Florence', 'Milan'],
    travlPiinsAmfindsCorrectIndex: 0,
    travlPiinsAmfindsExplanation:
      'Burano is an island in the Venetian Lagoon, famous for its bright houses and lace-making history.',
  },
  {
    travlPiinsAmfindsId: 'q15',
    travlPiinsAmfindsEmoji: '✝️',
    travlPiinsAmfindsPrompt:
      'Which landmark in Brazil stands above Rio de Janeiro with open arms?',
    travlPiinsAmfindsOptions: [
      'Sugarloaf Tower',
      'Christ the Redeemer',
      'Metropolitan Cathedral',
      'Copacabana Monument',
    ],
    travlPiinsAmfindsCorrectIndex: 1,
    travlPiinsAmfindsExplanation:
      'Christ the Redeemer is a famous statue overlooking Rio de Janeiro from Mount Corcovado.',
  },
  {
    travlPiinsAmfindsId: 'q16',
    travlPiinsAmfindsEmoji: '💃',
    travlPiinsAmfindsPrompt:
      'Which city is strongly associated with flamenco, orange trees, and the Alcázar palace?',
    travlPiinsAmfindsOptions: ['Seville', 'Bilbao', 'Porto', 'Granada'],
    travlPiinsAmfindsCorrectIndex: 0,
    travlPiinsAmfindsExplanation:
      'Seville in Spain is known for flamenco culture, historic architecture, and the Royal Alcázar.',
  },
  {
    travlPiinsAmfindsId: 'q17',
    travlPiinsAmfindsEmoji: '🎈',
    travlPiinsAmfindsPrompt:
      'Which place is famous for hot air balloons flying over unusual rock formations at sunrise?',
    travlPiinsAmfindsOptions: [
      'Cappadocia',
      'Santorini',
      'Petra',
      'Amalfi Coast',
    ],
    travlPiinsAmfindsCorrectIndex: 0,
    travlPiinsAmfindsExplanation:
      'Cappadocia in Türkiye is famous for fairy chimneys, cave hotels, and sunrise balloon flights.',
  },
  {
    travlPiinsAmfindsId: 'q18',
    travlPiinsAmfindsEmoji: '🦙',
    travlPiinsAmfindsPrompt: 'Which country is home to Machu Picchu?',
    travlPiinsAmfindsOptions: ['Chile', 'Bolivia', 'Peru', 'Colombia'],
    travlPiinsAmfindsCorrectIndex: 2,
    travlPiinsAmfindsExplanation:
      'Machu Picchu is an ancient Inca site located in the Andes Mountains of Peru.',
  },
  {
    travlPiinsAmfindsId: 'q19',
    travlPiinsAmfindsEmoji: '👟',
    travlPiinsAmfindsPrompt:
      'Which travel custom is common before entering many temples and homes in parts of Asia?',
    travlPiinsAmfindsOptions: [
      'Wearing sunglasses indoors',
      'Removing shoes',
      'Clapping three times',
      'Carrying a candle',
    ],
    travlPiinsAmfindsCorrectIndex: 1,
    travlPiinsAmfindsExplanation:
      'In many Asian cultures, removing shoes before entering homes or sacred places is a sign of respect.',
  },
  {
    travlPiinsAmfindsId: 'q20',
    travlPiinsAmfindsEmoji: '🏗️',
    travlPiinsAmfindsPrompt:
      'Which landmark is famous for leaning because of unstable foundation soil?',
    travlPiinsAmfindsOptions: [
      'Leaning Tower of Pisa',
      'Big Ben',
      'CN Tower',
      'Space Needle',
    ],
    travlPiinsAmfindsCorrectIndex: 0,
    travlPiinsAmfindsExplanation:
      'The Leaning Tower of Pisa began leaning due to soft ground and foundation issues.',
  },
  {
    travlPiinsAmfindsId: 'q21',
    travlPiinsAmfindsEmoji: '🏙️',
    travlPiinsAmfindsPrompt:
      'Which city is famous for the Burj Khalifa, the tallest building in the world?',
    travlPiinsAmfindsOptions: ['Doha', 'Dubai', 'Abu Dhabi', 'Riyadh'],
    travlPiinsAmfindsCorrectIndex: 1,
    travlPiinsAmfindsExplanation:
      'The Burj Khalifa is located in Dubai and is known as the world’s tallest skyscraper.',
  },
  {
    travlPiinsAmfindsId: 'q22',
    travlPiinsAmfindsEmoji: '🏝️',
    travlPiinsAmfindsPrompt:
      'Which famous Greek island is known for white houses, blue domes, and dramatic sunset views?',
    travlPiinsAmfindsOptions: ['Crete', 'Rhodes', 'Santorini', 'Corfu'],
    travlPiinsAmfindsCorrectIndex: 2,
    travlPiinsAmfindsExplanation:
      'Santorini is famous for its whitewashed architecture, blue-domed churches, and sunset views over the Aegean Sea.',
  },
  {
    travlPiinsAmfindsId: 'q23',
    travlPiinsAmfindsEmoji: '🇬🇧',
    travlPiinsAmfindsPrompt:
      'Which city is home to Big Ben and the Palace of Westminster?',
    travlPiinsAmfindsOptions: [
      'Edinburgh',
      'Dublin',
      'Manchester',
      'London',
    ],
    travlPiinsAmfindsCorrectIndex: 3,
    travlPiinsAmfindsExplanation:
      'Big Ben and the Palace of Westminster are among London’s most iconic landmarks.',
  },
  {
    travlPiinsAmfindsId: 'q24',
    travlPiinsAmfindsEmoji: '🙏',
    travlPiinsAmfindsPrompt:
      'Which country is famous for the traditional greeting “namaste”?',
    travlPiinsAmfindsOptions: ['India', 'Italy', 'Norway', 'Argentina'],
    travlPiinsAmfindsCorrectIndex: 0,
    travlPiinsAmfindsExplanation:
      '“Namaste” is widely used in India and nearby regions as a respectful greeting.',
  },
  {
    travlPiinsAmfindsId: 'q25',
    travlPiinsAmfindsEmoji: '🧱',
    travlPiinsAmfindsPrompt:
      'Which landmark is a massive ancient wall built across northern China?',
    travlPiinsAmfindsOptions: [
      'Hadrian’s Wall',
      'Great Wall of China',
      'Berlin Wall',
      'Western Wall',
    ],
    travlPiinsAmfindsCorrectIndex: 1,
    travlPiinsAmfindsExplanation:
      'The Great Wall of China was built over centuries as a defensive structure.',
  },
  {
    travlPiinsAmfindsId: 'q26',
    travlPiinsAmfindsEmoji: '🎨',
    travlPiinsAmfindsPrompt:
      'Which country is known for the Holi festival, where people throw colorful powders?',
    travlPiinsAmfindsOptions: ['Thailand', 'India', 'Greece', 'Portugal'],
    travlPiinsAmfindsCorrectIndex: 1,
    travlPiinsAmfindsExplanation:
      'Holi is a colorful Hindu festival celebrated widely in India and other regions.',
  },
  {
    travlPiinsAmfindsId: 'q27',
    travlPiinsAmfindsEmoji: '🏛️',
    travlPiinsAmfindsPrompt:
      'Which city is famous for the Acropolis and the Parthenon?',
    travlPiinsAmfindsOptions: ['Athens', 'Rome', 'Cairo', 'Istanbul'],
    travlPiinsAmfindsCorrectIndex: 0,
    travlPiinsAmfindsExplanation:
      'The Acropolis and Parthenon are ancient landmarks in Athens, Greece.',
  },
  {
    travlPiinsAmfindsId: 'q28',
    travlPiinsAmfindsEmoji: '🪞',
    travlPiinsAmfindsPrompt:
      'Which destination is known for a giant salt flat that can look like a mirror after rain?',
    travlPiinsAmfindsOptions: [
      'Atacama Desert',
      'Sahara Desert',
      'Salar de Uyuni',
      'Wadi Rum',
    ],
    travlPiinsAmfindsCorrectIndex: 2,
    travlPiinsAmfindsExplanation:
      'Salar de Uyuni in Bolivia becomes mirror-like after rain, reflecting the sky across its flat surface.',
  },
  {
    travlPiinsAmfindsId: 'q29',
    travlPiinsAmfindsEmoji: '🖼️',
    travlPiinsAmfindsPrompt:
      'Which city is famous for the Louvre Museum and the glass pyramid entrance?',
    travlPiinsAmfindsOptions: ['Paris', 'Vienna', 'Brussels', 'Berlin'],
    travlPiinsAmfindsCorrectIndex: 0,
    travlPiinsAmfindsExplanation:
      'The Louvre is located in Paris and is one of the world’s most famous museums.',
  },
  {
    travlPiinsAmfindsId: 'q30',
    travlPiinsAmfindsEmoji: '☕',
    travlPiinsAmfindsPrompt:
      'Which tradition is common in many Middle Eastern countries when welcoming guests?',
    travlPiinsAmfindsOptions: [
      'Offering tea or coffee',
      'Giving a passport stamp at home',
      'Throwing rice indoors',
      'Ringing a bell three times',
    ],
    travlPiinsAmfindsCorrectIndex: 0,
    travlPiinsAmfindsExplanation:
      'Hospitality is very important in many Middle Eastern cultures, and guests are often welcomed with tea or coffee.',
  },
  {
    travlPiinsAmfindsId: 'q31',
    travlPiinsAmfindsEmoji: '💧',
    travlPiinsAmfindsPrompt:
      'Which famous waterfall system lies on the border of Argentina and Brazil?',
    travlPiinsAmfindsOptions: [
      'Niagara Falls',
      'Iguazu Falls',
      'Victoria Falls',
      'Angel Falls',
    ],
    travlPiinsAmfindsCorrectIndex: 1,
    travlPiinsAmfindsExplanation:
      'Iguazu Falls is located on the border between Argentina and Brazil and is one of the world’s most impressive waterfall systems.',
  },
  {
    travlPiinsAmfindsId: 'q32',
    travlPiinsAmfindsEmoji: '🦎',
    travlPiinsAmfindsPrompt: 'Which city is known for Gaudí’s Park Güell?',
    travlPiinsAmfindsOptions: ['Lisbon', 'Barcelona', 'Rome', 'Marseille'],
    travlPiinsAmfindsCorrectIndex: 1,
    travlPiinsAmfindsExplanation:
      'Park Güell is one of Antoni Gaudí’s famous architectural works in Barcelona.',
  },
  {
    travlPiinsAmfindsId: 'q33',
    travlPiinsAmfindsEmoji: '⛰️',
    travlPiinsAmfindsPrompt:
      'Which country is famous for fjords such as Geirangerfjord and Nærøyfjord?',
    travlPiinsAmfindsOptions: ['Iceland', 'Finland', 'Norway', 'Ireland'],
    travlPiinsAmfindsCorrectIndex: 2,
    travlPiinsAmfindsExplanation:
      'Norway is famous for its deep fjords, steep cliffs, waterfalls, and scenic coastal landscapes.',
  },
  {
    travlPiinsAmfindsId: 'q34',
    travlPiinsAmfindsEmoji: '🗿',
    travlPiinsAmfindsPrompt:
      'Which place is known for giant stone heads called moai?',
    travlPiinsAmfindsOptions: [
      'Easter Island',
      'Galápagos Islands',
      'Madeira',
      'Malta',
    ],
    travlPiinsAmfindsCorrectIndex: 0,
    travlPiinsAmfindsExplanation:
      'Easter Island, also called Rapa Nui, is famous for its large moai statues.',
  },
  {
    travlPiinsAmfindsId: 'q35',
    travlPiinsAmfindsEmoji: '🫖',
    travlPiinsAmfindsPrompt:
      'Which country is strongly associated with hammams, souks, riads, and mint tea?',
    travlPiinsAmfindsOptions: ['Morocco', 'Sweden', 'Canada', 'Poland'],
    travlPiinsAmfindsCorrectIndex: 0,
    travlPiinsAmfindsExplanation:
      'Morocco is known for traditional markets, courtyard houses, mint tea, and hammam bathing culture.',
  },
  {
    travlPiinsAmfindsId: 'q36',
    travlPiinsAmfindsEmoji: '🎭',
    travlPiinsAmfindsPrompt: 'Which city is famous for the Sydney Opera House?',
    travlPiinsAmfindsOptions: ['Melbourne', 'Auckland', 'Sydney', 'Brisbane'],
    travlPiinsAmfindsCorrectIndex: 2,
    travlPiinsAmfindsExplanation:
      'The Sydney Opera House is one of Australia’s most famous architectural landmarks.',
  },
  {
    travlPiinsAmfindsId: 'q37',
    travlPiinsAmfindsEmoji: '🌅',
    travlPiinsAmfindsPrompt:
      'Which famous archaeological site in Cambodia is known for temple towers and sunrise reflections?',
    travlPiinsAmfindsOptions: ['Bagan', 'Angkor Wat', 'Borobudur', 'Ayutthaya'],
    travlPiinsAmfindsCorrectIndex: 1,
    travlPiinsAmfindsExplanation:
      'Angkor Wat is a large temple complex in Cambodia, often visited at sunrise.',
  },
  {
    travlPiinsAmfindsId: 'q38',
    travlPiinsAmfindsEmoji: '🚌',
    travlPiinsAmfindsPrompt:
      'Which city is famous for its red double-decker buses and black cabs?',
    travlPiinsAmfindsOptions: ['London', 'Amsterdam', 'Zurich', 'Copenhagen'],
    travlPiinsAmfindsCorrectIndex: 0,
    travlPiinsAmfindsExplanation:
      'London is strongly associated with red buses, black taxis, and classic British city imagery.',
  },
  {
    travlPiinsAmfindsId: 'q39',
    travlPiinsAmfindsEmoji: '🧖',
    travlPiinsAmfindsPrompt:
      'Which country is known for the tradition of sauna as an important part of daily culture?',
    travlPiinsAmfindsOptions: ['Finland', 'Portugal', 'Egypt', 'Mexico'],
    travlPiinsAmfindsCorrectIndex: 0,
    travlPiinsAmfindsExplanation:
      'Sauna culture is deeply rooted in Finland and is an important part of Finnish lifestyle.',
  },
  {
    travlPiinsAmfindsId: 'q40',
    travlPiinsAmfindsEmoji: '🕌',
    travlPiinsAmfindsPrompt:
      'Which city is home to the Blue Mosque and Hagia Sophia?',
    travlPiinsAmfindsOptions: ['Istanbul', 'Cairo', 'Beirut', 'Tbilisi'],
    travlPiinsAmfindsCorrectIndex: 0,
    travlPiinsAmfindsExplanation:
      'Istanbul is home to both the Blue Mosque and Hagia Sophia, two major historic landmarks.',
  },
];

/** Questions per quiz run */
export const travlPiinsAmfindsQuizRoundSize = 10;

export const travlPiinsAmfindsQuizPoolCount = travlPiinsAmfindsQuizQuestions.length;

/** @deprecated Use travlPiinsAmfindsQuizRoundSize for a single quiz session */
export const travlPiinsAmfindsQuizQuestionCount = travlPiinsAmfindsQuizRoundSize;

export function travlPiinsAmfindsPickQuizRound(): TravlPiinsAmfindsQuizQuestion[] {
  const travlPiinsAmfindsShuffled = [...travlPiinsAmfindsQuizQuestions];
  for (let i = travlPiinsAmfindsShuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [travlPiinsAmfindsShuffled[i], travlPiinsAmfindsShuffled[j]] = [
      travlPiinsAmfindsShuffled[j],
      travlPiinsAmfindsShuffled[i],
    ];
  }
  return travlPiinsAmfindsShuffled.slice(
    0,
    Math.min(travlPiinsAmfindsQuizRoundSize, travlPiinsAmfindsShuffled.length),
  );
}

export function travlPiinsAmfindsFindQuizQuestion(
  travlPiinsAmfindsId: string,
): TravlPiinsAmfindsQuizQuestion | undefined {
  return travlPiinsAmfindsQuizQuestions.find(
    q => q.travlPiinsAmfindsId === travlPiinsAmfindsId,
  );
}
