module.exports = [
  { type: 'text', id: 'keyword', label: 'Keyword', value: 'Google' },
  { type: 'select', id: 'language', label: 'Languages', value: [ { label: 'Any language', value: '' }, { label: 'Go', value: 'Go' }, { label: 'Java', value: 'Java' }, { label: 'JavaScript', value: 'JavaScript' }, { label: 'Python', value: 'Python' } ] },
  { type: 'radio', id: 'sort', label: 'Sort', value: [ { label: 'Best match', value: '' }, { label: 'Most stars', value: 'stars' } ] },
  { type: 'checkbox', id: 'newTab', label: 'Config', value: 'Open new tab' }
]