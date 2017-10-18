export const treeData = {
  name: 'MY SNIPPETS',
  open: true,
  children: [
    { name: 'getDate', description: 'Get current date', snippet: 'getDate' },
    { name: 'getDateWithMoment', description: 'Get locale and current date', snippet: 'getDateWithMoment' },
    { name: 'getTitle', description: 'Get current page title', snippet: 'getTitle' },
    { name: 'simplePromise', description: 'Simple Promise usage', snippet: 'simplePromise' },
    { name: 'displayGithubUserAvatar', description: 'Note: Please execute on Github user page', snippet: 'displayGithubUserAvatar', domain: 'github.com' },
    { name: 'copyToClipboard', description: 'Copy datetime to clipboard', snippet: 'copyToClipboard' },
    { name: 'setItemToLocalStorage', description: 'Set item to LocalStorage', form: 'setLocalStorageForm', snippet: 'setLocalStorage' },
    { name: 'removeItemFromLocalStorage', description: 'Remove item from LocalStorage', form: 'removeLocalStorageForm', snippet: 'removeLocalStorage' },
    { name: 'searchGithubRepo', description: 'Search Github repo', form: 'searchGithubRepoForm', snippet: 'searchGithubRepo' },
    { name: 'changeContributionColor', description: 'Change Contributions Color', snippet: 'changeContributionColor', domain: 'github.com/(?!.*(/|=)).*$', autoRun: true },
    { name: 'child', children: [
      { name: 'nested child', children: [
        { name: 'nested child', snippet: 'subfolder/nestedChild' },
      ] },
    ] }
  ]
}