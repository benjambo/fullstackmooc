const bloglist = [
  {
    title: 'This is America',
    author: 'Pippin Burger',
    url: 'www.pippin.com/america',
    user: {
      username: 'pippin',
      name: 'Pippin Burger',
      id: '5df91364713ba126392ff7f9'
    },
    id: '5dfc9605fa4126474d7de246'
  },
  {
    title: 'Faul Hennesy',
    author: 'Benjamin B',
    url: 'www.benjamin.com/hennesy',
    user: {
      username: 'benjambo',
      name: 'Benjamin B',
      id: '5dfc91e94cb01e2edb824feb'
    },
    id: '5dfc9669fa4126474d7de247'
  },
  {
    title: 'For the Same reason',
    author: 'Pippin Burger',
    url: 'www.pippin.com/reason',
    user: {
      username: 'pippin',
      name: 'Pippin Burger',
      id: '5df91364713ba126392ff7f9'
    },
    id: '5dfc96dffa4126474d7de248'
  },
  {
    title: 'Life of Ben',
    author: 'Benjamin B',
    url: 'www.benjamin.com/life',
    user: {
      username: 'benjambo',
      name: 'Benjamin B',
      id: '5dfc91e94cb01e2edb824feb'
    },
    id: '5dfca2a3fa4126474d7de249'
  },
  {
    title: 'Haul of War',
    author: 'Benjamin B',
    url: 'www.benjamin.com/haul',
    user: {
      username: 'benjambo',
      name: 'Benjamin B',
      id: '5dfc91e94cb01e2edb824feb'
    },
    id: '5dfcd3db66284a421a71a216'
  }
]

const getAll = () => {
  return Promise.resolve(bloglist)
}

export default { getAll }
