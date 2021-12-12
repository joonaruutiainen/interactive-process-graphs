// NOTE: These example processes are not be used as testing meters, but as a help to get
// started with the development of the ProcessGraph component and its child components.
const exampleProcesses = [
  {
    name: 'simple example',
    nodes: [
      {
        id: 1,
        type: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        nextNodes: [4],
        previousNodes: [],
        description: 'Ingredient A tank',
        data: {
          mass_flow: '1.5kg/s',
          pressure: 0.3,
          liiba: 'laaba',
          liirum: 'laarum',
          asd: true,
          asd1: {
            asd2: 'asd',
          },
          asd3: ['asd', 'asd'],
        },
      },
      {
        id: 2,
        type: 'tank',
        nextNodes: [5],
        previousNodes: [],
        description: 'Ingredient B tank',
        data: {
          mass_flow: '1.5kg/s',
          pressure: '0.3',
          liiba:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
      },
      {
        id: 3,
        type: 'tank',
        nextNodes: [6],
        previousNodes: [],
        description: 'Water tank',
        data: {
          mass_flow: '1.5kg/s',
        },
      },
      {
        id: 4,
        type: 'pipe',
        nextNodes: [7],
        previousNodes: [1],
        description: 'Pipe from ingredient A tank to mixing tank',
        data: {
          mass_flow: '1.5kg/s',
          pressure: '0.3',
          liiba: 'laaba',
          liirum: 'laarum',
          mass_flow2: '1.5kg/s',
          pressure2: '0.3',
          liiba2: 'laaba',
          liirum2: 'laarum',
        },
      },
      {
        id: 5,
        type: 'pipe',
        nextNodes: [7],
        previousNodes: [2],
        description: 'Pipe from ingredient B tank to mixing tank',
      },
      {
        id: 6,
        type: 'pipe',
        nextNodes: [7],
        previousNodes: [3],
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        data: {
          mass_flow: '1.5kg/s',
          pressure: '0.3',
          liiba: 'laaba',
          liirum: 'laarum',
          mass_flow2: '1.5kg/s',
          pressure2: '0.3',
          liiba2: 'laaba',
          liirum2: 'laarum',
        },
      },
      {
        id: 7,
        type: 'tank',
        nextNodes: [],
        previousNodes: [4, 5, 6],
        description: 'Mixing tank',
      },
    ],
  },
  {
    name: 'loop example',
    nodes: [
      {
        id: 1,
        type: 'screw feeder',
        nextNodes: [2],
        previousNodes: [],
        description: 'Powder screw feeder',
      },
      {
        id: 2,
        type: 'pipe',
        nextNodes: [6],
        previousNodes: [1],
        description: 'Pipe from powder screw feeder to mixing tank 1',
      },
      {
        id: 3,
        type: 'tank',
        nextNodes: [4, 11],
        previousNodes: [],
        description: 'Water tank',
      },
      {
        id: 4,
        type: 'pipe',
        nextNodes: [6],
        previousNodes: [3],
        description: 'Pipe from water tank to mixing tank 1',
      },
      {
        id: 5,
        type: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        nextNodes: [6],
        previousNodes: [9],
        description: 'Feedback pipe',
      },
      {
        id: 6,
        type: 'tank',
        nextNodes: [7],
        previousNodes: [2, 4, 5],
        description: 'Mixing tank 1',
      },
      {
        id: 7,
        type: 'pipe',
        nextNodes: [8],
        previousNodes: [7],
        description: 'Pipe from mixing tank 1',
      },
      {
        id: 8,
        type: 'pump',
        nextNodes: [9],
        previousNodes: [7],
        description: 'Mixin tank 1 pump',
      },
      {
        id: 9,
        type: 'pipe',
        nextNodes: [10, 5],
        previousNodes: [8],
        description: 'Branching pipe',
      },
      {
        id: 10,
        type: 'pipe',
        nextNodes: [12],
        previousNodes: [9],
        description: 'Pipe to mixing tank 2',
      },
      {
        id: 11,
        type: 'pipe',
        nextNodes: [12],
        previousNodes: [3],
        description: 'Pipe from water tank to mixing tank 2',
      },
      {
        id: 12,
        type: 'tank',
        nextNodes: [13],
        previousNodes: [10, 11],
        description: 'Mixing tank 2',
      },
      {
        id: 13,
        type: 'pipe',
        nextNodes: [14],
        previousNodes: [12],
        description: 'Pipe from mixing tank 2',
      },
      {
        id: 14,
        type: 'pump',
        nextNodes: [15],
        previousNodes: [13],
        description: 'Mixing tank 2 pump',
      },
      {
        id: 15,
        type: 'pipe',
        nextNodes: [],
        previousNodes: [14],
        description: 'Output pipe',
      },
    ],
  },
  {
    name: 'multiple inputs example',
    nodes: [
      {
        id: 1,
        type: 'input',
        nextNodes: [2],
        previousNodes: [],
        description: 'Ingredient A input',
      },
      {
        id: 2,
        type: 'tank',
        nextNodes: [3],
        previousNodes: [1],
        description: 'Ingredient A tank',
      },
      {
        id: 3,
        type: 'pipe',
        nextNodes: [20],
        previousNodes: [2],
        description: 'Pipe from ingredient A tank to reactor',
      },
      {
        id: 4,
        type: 'input',
        nextNodes: [5],
        previousNodes: [],
        description: 'Ingredient B input',
      },
      {
        id: 5,
        type: 'tank',
        nextNodes: [6],
        previousNodes: [2],
        description: 'Ingredient B tank',
      },
      {
        id: 6,
        type: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        nextNodes: [20],
        previousNodes: [5],
        description: 'Pipe from ingredient B tank to reactor',
      },
      {
        id: 7,
        type: 'input',
        nextNodes: [8],
        previousNodes: [],
        description: 'Ingredient C input',
      },
      {
        id: 8,
        type: 'tank',
        nextNodes: [9],
        previousNodes: [7],
        description: 'Ingredient C tank',
      },
      {
        id: 9,
        type: 'pipe',
        nextNodes: [20],
        previousNodes: [8],
        description: 'Pipe from ingredient C tank to reactor',
      },
      {
        id: 10,
        type: 'input',
        nextNodes: [11],
        previousNodes: [],
        description: 'Ingredient D input',
      },
      {
        id: 11,
        type: 'tank',
        nextNodes: [12],
        previousNodes: [10],
        description: 'Ingredient D tank',
      },
      {
        id: 12,
        type: 'pipe',
        nextNodes: [20],
        previousNodes: [11],
        description: 'Pipe from ingredient D tank to reactor',
      },
      {
        id: 13,
        type: 'input',
        nextNodes: [14],
        previousNodes: [],
        description: 'Ingredient E input',
      },
      {
        id: 14,
        type: 'tank',
        nextNodes: [15],
        previousNodes: [13],
        description: 'Ingredient E tank',
      },
      {
        id: 15,
        type: 'pipe',
        nextNodes: [20],
        previousNodes: [14],
        description: 'Pipe from ingredient E tank to reactor',
      },
      {
        id: 16,
        type: 'input',
        nextNodes: [17],
        previousNodes: [],
        description: 'Ingredient F input',
      },
      {
        id: 17,
        type: 'tank',
        nextNodes: [18],
        previousNodes: [16],
        description: 'Ingredient F tank',
      },
      {
        id: 18,
        type: 'pipe',
        nextNodes: [20],
        previousNodes: [17],
        description: 'Pipe from ingredient F tank to reactor',
      },
      {
        id: 19,
        type: 'input',
        nextNodes: [20],
        previousNodes: [],
        description: 'Reactor input',
      },
      {
        id: 20,
        type: 'reactor',
        nextNodes: [21],
        previousNodes: [4, 6, 9, 12, 15, 18, 19],
        description: 'Reactor tank',
      },
      {
        id: 21,
        type: 'pipe',
        nextNodes: [22],
        previousNodes: [20],
        description: 'Pipe to reactor pump',
      },
      {
        id: 22,
        type: 'pump',
        nextNodes: [23],
        previousNodes: [21],
        description: 'Reactor pump',
      },
      {
        id: 23,
        type: 'pipe',
        nextNodes: [25],
        previousNodes: [22],
        description: 'Pipe from reactor pump to cooling tank',
      },
      {
        id: 24,
        type: 'input',
        nextNodes: [25],
        previousNodes: [],
        description: 'Cooling tank input',
      },
      {
        id: 25,
        type: 'tank',
        nextNodes: [26],
        previousNodes: [23, 24],
        description: 'Cooling tank',
      },
      {
        id: 26,
        type: 'pipe',
        nextNodes: [27],
        previousNodes: [25],
        description: 'Pipe to cooling tank pump',
      },
      {
        id: 27,
        type: 'pump',
        nextNodes: [28],
        previousNodes: [26],
        description: 'Cooling tank pump',
      },
      {
        id: 28,
        type: 'pipe',
        nextNodes: [29],
        previousNodes: [27],
        description: 'Pipe from cooling tank pump to storage tank',
      },
      {
        id: 29,
        type: 'tank',
        nextNodes: [],
        previousNodes: [28],
        description: 'Storage tank',
      },
    ],
  },
];

export default exampleProcesses;
