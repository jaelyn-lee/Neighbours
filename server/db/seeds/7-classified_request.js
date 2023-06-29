exports.seed = async function (knex) {
  await knex('classified_request').insert([
    {
      id: 1,
      user_auth0_id: 'auth0_1',
      location_id: 4,
      title: 'Help Needed: Cockroach in House',
      type: 'Household',
      image: 'https://example.com/cockroach.jpg',
      date: '2023-07-15',
      time: '15:00:00',
      venue: 'My House',
      description:
        "There is a cockroach in my house, and I need someone's help to get rid of it!",
    },
    {
      id: 2,
      user_auth0_id: 'auth0_2',
      location_id: 4,
      title: 'Gardening Assistance Needed',
      type: 'Gardening',
      image: 'https://example.com/gardening.jpg',
      date: '2023-08-05',
      time: '18:30:00',
      venue: 'Backyard',
      description:
        "I'm looking for someone who can help me with gardening tasks like weeding and planting.",
    },
    {
      id: 3,
      user_auth0_id: 'auth0_3',
      location_id: 4,
      title: 'Math Tutor Needed',
      type: 'Education',
      image: 'https://example.com/math-tutor.jpg',
      date: '2023-09-10',
      time: '19:00:00',
      venue: 'Library',
      description:
        'I need a math tutor to help me with algebra and calculus. Willing to pay for the lessons.',
    },
  ])
}
