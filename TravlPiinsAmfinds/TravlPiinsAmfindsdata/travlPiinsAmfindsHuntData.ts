export type TravlPiinsAmfindsHuntDifficulty = 'Easy' | 'Medium' | 'Hard';

export type TravlPiinsAmfindsHuntTask = {
  travlPiinsAmfindsId: string;
  travlPiinsAmfindsTitle: string;
  travlPiinsAmfindsDifficulty: TravlPiinsAmfindsHuntDifficulty;
  travlPiinsAmfindsType: string;
  travlPiinsAmfindsDescription: string;
};

export const travlPiinsAmfindsHuntTasks: TravlPiinsAmfindsHuntTask[] = [
  {
    travlPiinsAmfindsId: 'hunt01',
    travlPiinsAmfindsTitle: 'Golden Hour Find',
    travlPiinsAmfindsDifficulty: 'Easy',
    travlPiinsAmfindsType: 'Light Hunt',
    travlPiinsAmfindsDescription:
      'Capture a place during warm morning or evening light, when the scene feels softer, calmer, and more cinematic.',
  },
  {
    travlPiinsAmfindsId: 'hunt02',
    travlPiinsAmfindsTitle: 'Color That Stops You',
    travlPiinsAmfindsDifficulty: 'Easy',
    travlPiinsAmfindsType: 'Color Hunt',
    travlPiinsAmfindsDescription:
      'Find one bold color in a street, wall, sign, flower, door, vehicle, or building that instantly catches attention.',
  },
  {
    travlPiinsAmfindsId: 'hunt03',
    travlPiinsAmfindsTitle: 'Local Doorway Story',
    travlPiinsAmfindsDifficulty: 'Easy',
    travlPiinsAmfindsType: 'Detail Hunt',
    travlPiinsAmfindsDescription:
      'Photograph an interesting doorway, gate, entrance, or arch that feels connected to the character of the place.',
  },
  {
    travlPiinsAmfindsId: 'hunt04',
    travlPiinsAmfindsTitle: 'Tiny Travel Detail',
    travlPiinsAmfindsDifficulty: 'Easy',
    travlPiinsAmfindsType: 'Close-Up Hunt',
    travlPiinsAmfindsDescription:
      'Capture a small detail that many people might ignore: a tile, handle, street lamp, pattern, stone, sticker, or carved symbol.',
  },
  {
    travlPiinsAmfindsId: 'hunt05',
    travlPiinsAmfindsTitle: 'Sky Above the Place',
    travlPiinsAmfindsDifficulty: 'Easy',
    travlPiinsAmfindsType: 'Sky Hunt',
    travlPiinsAmfindsDescription:
      'Take a photo where the sky becomes an important part of the scene, whether it is blue, cloudy, dramatic, or glowing at sunset.',
  },
  {
    travlPiinsAmfindsId: 'hunt06',
    travlPiinsAmfindsTitle: 'Postcard Corner',
    travlPiinsAmfindsDifficulty: 'Medium',
    travlPiinsAmfindsType: 'Composition Hunt',
    travlPiinsAmfindsDescription:
      'Find a corner of a street, square, bridge, or viewpoint that looks like it could belong on a travel postcard.',
  },
  {
    travlPiinsAmfindsId: 'hunt07',
    travlPiinsAmfindsTitle: 'Hidden Texture',
    travlPiinsAmfindsDifficulty: 'Medium',
    travlPiinsAmfindsType: 'Texture Hunt',
    travlPiinsAmfindsDescription:
      'Capture an interesting surface texture such as old stone, wooden doors, colorful tiles, cracked walls, sand, pavement, or woven fabric.',
  },
  {
    travlPiinsAmfindsId: 'hunt08',
    travlPiinsAmfindsTitle: 'Reflection Route',
    travlPiinsAmfindsDifficulty: 'Medium',
    travlPiinsAmfindsType: 'Reflection Hunt',
    travlPiinsAmfindsDescription:
      'Find a reflection in water, glass, mirrors, shop windows, or wet pavement that shows the place from a different angle.',
  },
  {
    travlPiinsAmfindsId: 'hunt09',
    travlPiinsAmfindsTitle: 'Street Sign Moment',
    travlPiinsAmfindsDifficulty: 'Easy',
    travlPiinsAmfindsType: 'Urban Hunt',
    travlPiinsAmfindsDescription:
      'Photograph a street sign, direction board, metro sign, local warning, or handwritten note that gives the place a unique local feeling.',
  },
  {
    travlPiinsAmfindsId: 'hunt10',
    travlPiinsAmfindsTitle: 'A View Through Something',
    travlPiinsAmfindsDifficulty: 'Medium',
    travlPiinsAmfindsType: 'Frame Hunt',
    travlPiinsAmfindsDescription:
      'Take a photo through an arch, window, doorway, fence, bridge opening, tree branches, or any natural frame.',
  },
  {
    travlPiinsAmfindsId: 'hunt11',
    travlPiinsAmfindsTitle: 'Local Transport Shot',
    travlPiinsAmfindsDifficulty: 'Medium',
    travlPiinsAmfindsType: 'City Life Hunt',
    travlPiinsAmfindsDescription:
      'Capture a tram, bus, bicycle, boat, tuk-tuk, cable car, train, or other transport that feels typical for the location.',
  },
  {
    travlPiinsAmfindsId: 'hunt12',
    travlPiinsAmfindsTitle: 'Quiet Bench Scene',
    travlPiinsAmfindsDifficulty: 'Easy',
    travlPiinsAmfindsType: 'Calm Moment Hunt',
    travlPiinsAmfindsDescription:
      'Find a bench, resting spot, small park corner, or peaceful seat that looks like a perfect place to pause during travel.',
  },
  {
    travlPiinsAmfindsId: 'hunt13',
    travlPiinsAmfindsTitle: 'Market Color Burst',
    travlPiinsAmfindsDifficulty: 'Medium',
    travlPiinsAmfindsType: 'Culture Hunt',
    travlPiinsAmfindsDescription:
      'Photograph a colorful market detail: fruit, spices, fabrics, flowers, handmade items, signs, baskets, or local products.',
  },
  {
    travlPiinsAmfindsId: 'hunt14',
    travlPiinsAmfindsTitle: 'Old Meets New',
    travlPiinsAmfindsDifficulty: 'Hard',
    travlPiinsAmfindsType: 'Contrast Hunt',
    travlPiinsAmfindsDescription:
      'Capture a scene where modern life meets history, such as a new building near an old wall, a scooter beside ancient stone, or neon lights near traditional architecture.',
  },
  {
    travlPiinsAmfindsId: 'hunt15',
    travlPiinsAmfindsTitle: 'Bridge Perspective',
    travlPiinsAmfindsDifficulty: 'Medium',
    travlPiinsAmfindsType: 'Perspective Hunt',
    travlPiinsAmfindsDescription:
      'Take a photo of a bridge from an unusual angle: from below, from the side, through its structure, or with people crossing it.',
  },
  {
    travlPiinsAmfindsId: 'hunt16',
    travlPiinsAmfindsTitle: 'Travel Shadow Play',
    travlPiinsAmfindsDifficulty: 'Medium',
    travlPiinsAmfindsType: 'Light & Shadow Hunt',
    travlPiinsAmfindsDescription:
      'Find an interesting shadow pattern on a wall, street, staircase, window, column, or building facade.',
  },
  {
    travlPiinsAmfindsId: 'hunt17',
    travlPiinsAmfindsTitle: 'One Local Pattern',
    travlPiinsAmfindsDifficulty: 'Easy',
    travlPiinsAmfindsType: 'Pattern Hunt',
    travlPiinsAmfindsDescription:
      'Capture a repeating pattern that represents the place: tiles, windows, balconies, pavement, textiles, roof shapes, or decorative lines.',
  },
  {
    travlPiinsAmfindsId: 'hunt18',
    travlPiinsAmfindsTitle: 'The Smallest Landmark',
    travlPiinsAmfindsDifficulty: 'Medium',
    travlPiinsAmfindsType: 'Discovery Hunt',
    travlPiinsAmfindsDescription:
      'Find a small statue, plaque, fountain, sign, sculpture, or monument that is easy to miss but worth noticing.',
  },
  {
    travlPiinsAmfindsId: 'hunt19',
    travlPiinsAmfindsTitle: 'Food With a Sense of Place',
    travlPiinsAmfindsDifficulty: 'Easy',
    travlPiinsAmfindsType: 'Food Hunt',
    travlPiinsAmfindsDescription:
      'Photograph a local snack, drink, dessert, café table, market meal, or food detail that feels connected to the destination.',
  },
  {
    travlPiinsAmfindsId: 'hunt20',
    travlPiinsAmfindsTitle: 'Steps to Somewhere',
    travlPiinsAmfindsDifficulty: 'Easy',
    travlPiinsAmfindsType: 'Route Hunt',
    travlPiinsAmfindsDescription:
      'Capture stairs, steps, a steep lane, or a path that makes the viewer wonder where it leads.',
  },
  {
    travlPiinsAmfindsId: 'hunt21',
    travlPiinsAmfindsTitle: 'Window With Character',
    travlPiinsAmfindsDifficulty: 'Easy',
    travlPiinsAmfindsType: 'Architecture Hunt',
    travlPiinsAmfindsDescription:
      'Find a window with shutters, flowers, reflections, curtains, carvings, unusual shape, or strong local style.',
  },
  {
    travlPiinsAmfindsId: 'hunt22',
    travlPiinsAmfindsTitle: 'A Place in Motion',
    travlPiinsAmfindsDifficulty: 'Hard',
    travlPiinsAmfindsType: 'Movement Hunt',
    travlPiinsAmfindsDescription:
      'Capture movement in a travel scene: people crossing, birds flying, waves moving, cars passing, flags waving, or boats leaving.',
  },
  {
    travlPiinsAmfindsId: 'hunt23',
    travlPiinsAmfindsTitle: 'Local Morning Mood',
    travlPiinsAmfindsDifficulty: 'Medium',
    travlPiinsAmfindsType: 'Time Hunt',
    travlPiinsAmfindsDescription:
      'Take a photo that shows how the place feels in the morning: opening shops, quiet streets, early light, breakfast spots, or empty squares.',
  },
  {
    travlPiinsAmfindsId: 'hunt24',
    travlPiinsAmfindsTitle: 'Night Lights Find',
    travlPiinsAmfindsDifficulty: 'Medium',
    travlPiinsAmfindsType: 'Night Hunt',
    travlPiinsAmfindsDescription:
      'Capture a place after dark, using lights from signs, windows, bridges, streets, fountains, or reflections to create atmosphere.',
  },
  {
    travlPiinsAmfindsId: 'hunt25',
    travlPiinsAmfindsTitle: 'The Best Viewpoint',
    travlPiinsAmfindsDifficulty: 'Hard',
    travlPiinsAmfindsType: 'Scenic Hunt',
    travlPiinsAmfindsDescription:
      'Find a viewpoint that shows the city, coast, mountains, rooftops, river, valley, or landmark from above.',
  },
  {
    travlPiinsAmfindsId: 'hunt26',
    travlPiinsAmfindsTitle: 'Local Craft Detail',
    travlPiinsAmfindsDifficulty: 'Medium',
    travlPiinsAmfindsType: 'Culture Hunt',
    travlPiinsAmfindsDescription:
      'Photograph a handmade object, craft display, textile, ceramic, carving, painting, or workshop detail that shows local creativity.',
  },
  {
    travlPiinsAmfindsId: 'hunt27',
    travlPiinsAmfindsTitle: 'Map-Like Street Scene',
    travlPiinsAmfindsDifficulty: 'Hard',
    travlPiinsAmfindsType: 'Layout Hunt',
    travlPiinsAmfindsDescription:
      'Capture a street, square, crossing, or route from an angle that clearly shows how people move through the place.',
  },
  {
    travlPiinsAmfindsId: 'hunt28',
    travlPiinsAmfindsTitle: 'Unexpected Green Spot',
    travlPiinsAmfindsDifficulty: 'Easy',
    travlPiinsAmfindsType: 'Nature Hunt',
    travlPiinsAmfindsDescription:
      'Find plants, trees, flowers, vines, garden corners, or greenery appearing in an urban or historical setting.',
  },
  {
    travlPiinsAmfindsId: 'hunt29',
    travlPiinsAmfindsTitle: 'Travel Weather Mood',
    travlPiinsAmfindsDifficulty: 'Medium',
    travlPiinsAmfindsType: 'Weather Hunt',
    travlPiinsAmfindsDescription:
      'Capture how weather changes the place: rain on pavement, fog near buildings, wind in flags, sunlight through clouds, or snow on streets.',
  },
  {
    travlPiinsAmfindsId: 'hunt30',
    travlPiinsAmfindsTitle: 'Your Amazing Find',
    travlPiinsAmfindsDifficulty: 'Hard',
    travlPiinsAmfindsType: 'Personal Hunt',
    travlPiinsAmfindsDescription:
      'Photograph any place or detail that feels personally special to you and explain why it deserves a place on your Amazing Board.',
  },
  {
    travlPiinsAmfindsId: 'hunt31',
    travlPiinsAmfindsTitle: 'Unexpected Reflection',
    travlPiinsAmfindsDifficulty: 'Medium',
    travlPiinsAmfindsType: 'Creative Hunt',
    travlPiinsAmfindsDescription:
      'Find a reflection that appears in an unusual place, such as a car window, metal surface, puddle, glass door, sunglasses, or polished sign.',
  },
  {
    travlPiinsAmfindsId: 'hunt32',
    travlPiinsAmfindsTitle: 'The Corner Café Scene',
    travlPiinsAmfindsDifficulty: 'Easy',
    travlPiinsAmfindsType: 'Lifestyle Hunt',
    travlPiinsAmfindsDescription:
      'Capture a cozy café corner, outdoor table, coffee cup, pastry display, or small seating area that shows the local mood of the place.',
  },
  {
    travlPiinsAmfindsId: 'hunt33',
    travlPiinsAmfindsTitle: 'A Sign of the Country',
    travlPiinsAmfindsDifficulty: 'Medium',
    travlPiinsAmfindsType: 'Culture Hunt',
    travlPiinsAmfindsDescription:
      'Photograph something that clearly hints at the country or region: a flag, language sign, traditional symbol, local product, or public notice.',
  },
  {
    travlPiinsAmfindsId: 'hunt34',
    travlPiinsAmfindsTitle: 'Rooftop or Balcony View',
    travlPiinsAmfindsDifficulty: 'Medium',
    travlPiinsAmfindsType: 'View Hunt',
    travlPiinsAmfindsDescription:
      'Capture a scene from above, such as rooftops, balconies, terraces, narrow streets, courtyards, or a city view from a higher point.',
  },
  {
    travlPiinsAmfindsId: 'hunt35',
    travlPiinsAmfindsTitle: "The Traveler's Path",
    travlPiinsAmfindsDifficulty: 'Easy',
    travlPiinsAmfindsType: 'Route Hunt',
    travlPiinsAmfindsDescription:
      'Take a photo of a path, road, alley, bridge, forest trail, seaside promenade, or walkway that invites someone to keep moving forward.',
  },
  {
    travlPiinsAmfindsId: 'hunt36',
    travlPiinsAmfindsTitle: 'Local Sound in a Photo',
    travlPiinsAmfindsDifficulty: 'Hard',
    travlPiinsAmfindsType: 'Atmosphere Hunt',
    travlPiinsAmfindsDescription:
      'Capture a scene that almost feels audible, such as musicians, a busy market, waves, church bells, street performers, traffic, or people talking in a square.',
  },
  {
    travlPiinsAmfindsId: 'hunt37',
    travlPiinsAmfindsTitle: 'One Beautiful Door Handle',
    travlPiinsAmfindsDifficulty: 'Easy',
    travlPiinsAmfindsType: 'Detail Hunt',
    travlPiinsAmfindsDescription:
      'Find a door handle, knocker, lock, keyhole, or metal detail that looks old, decorative, unusual, or connected to the place’s style.',
  },
  {
    travlPiinsAmfindsId: 'hunt38',
    travlPiinsAmfindsTitle: 'The Weathered Wall',
    travlPiinsAmfindsDifficulty: 'Medium',
    travlPiinsAmfindsType: 'Texture Hunt',
    travlPiinsAmfindsDescription:
      'Photograph an old wall with cracks, faded paint, posters, ivy, stone blocks, graffiti, tiles, or layers that show time and character.',
  },
  {
    travlPiinsAmfindsId: 'hunt39',
    travlPiinsAmfindsTitle: 'Festival or Celebration Detail',
    travlPiinsAmfindsDifficulty: 'Hard',
    travlPiinsAmfindsType: 'Event Hunt',
    travlPiinsAmfindsDescription:
      'Capture a respectful detail from a festival, street celebration, market day, parade, seasonal decoration, or public gathering.',
  },
  {
    travlPiinsAmfindsId: 'hunt40',
    travlPiinsAmfindsTitle: 'The Quiet Landmark Angle',
    travlPiinsAmfindsDifficulty: 'Hard',
    travlPiinsAmfindsType: 'Landmark Hunt',
    travlPiinsAmfindsDescription:
      'Photograph a famous landmark from a less obvious angle, focusing on a side view, small detail, shadow, reflection, nearby street, or frame around it.',
  },
];

export function travlPiinsAmfindsFindHuntTask(
  travlPiinsAmfindsId: string,
): TravlPiinsAmfindsHuntTask | undefined {
  return travlPiinsAmfindsHuntTasks.find(
    t => t.travlPiinsAmfindsId === travlPiinsAmfindsId,
  );
}
