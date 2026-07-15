const searchfilterableFields = new Map(
  [
    'department',
    'designation',
    'location',
    'projects$projectName',
    'projects$priorityRanking',
    'projects$riskStatus',
    'projects$status',
    'reviewReason',
    'workMode',
    'employeeSatisfaction',
    'currentDesignation',
    'previousDesignation',
  ].map((item) => [item.split('$').slice(item.split('$').length - 1)[0], item])
);
const filterableFields = [
  'department',
  'designation',
  'location',
  // 'projects$projectName',
  // 'projects$priorityRanking',
  // 'projects$riskStatus',
  // 'projects$status',
  // 'reviewReason',
  'workMode',
];
const filterableFieldsTopProjects = [
  'projects$projectName',
  // 'projects$priorityRanking',
  'projects$riskStatus',
  // 'projects$status',
];
const filterableFieldsTopPerformers = ['department', 'designation'];

const filterableFieldsPromoted = [
  'department',
  'currentDesignation',
  'previousDesignation',
];
const filterableFieldsReview = ['department', 'designation', 'reviewReason'];

const searchableFields = new Map([
  [
    'name',
    {
      type: 'primitive',
    },
  ],
  [
    'email',
    {
      type: 'primitive',
    },
  ],
  [
    'department',
    {
      type: 'primitive',
    },
  ],
  [
    'designation',
    {
      type: 'primitive',
    },
  ],
  [
    'location',
    {
      type: 'primitive',
    },
  ],
  [
    'riskStatus',
    {
      type: 'primitive',
    },
  ],
  [
    'status',
    {
      type: 'primitive',
    },
  ],
  [
    'currentDesignation',
    {
      type: 'primitive',
    },
  ],
  [
    'previousDesignation',
    {
      type: 'primitive',
    },
  ],
  [
    'reviewReason',
    {
      type: 'primitive-array',
    },
  ],
  [
    'workMode',
    {
      type: 'primitive',
    },
  ],
  [
    'employeeSatisfaction',
    {
      type: 'primitive',
    },
  ],
  [
    'rating',
    {
      type: 'primitive',
    },
  ],
  [
    'priorityRanking',
    {
      type: 'primitive',
    },
  ],
]);
module.exports = {
  filterableFields,
  searchableFields,
  filterableFieldsReview,
  filterableFieldsPromoted,
  filterableFieldsTopPerformers,
  searchfilterableFields,
  filterableFieldsTopProjects,
};
