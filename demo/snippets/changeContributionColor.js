function convertContributionColor(sourceColorCode) {
  let distColorCode = sourceColorCode
  switch (sourceColorCode) {
    case '#c6e48b':
      distColorCode = '#a98be4'
      break
    case '#7bc96f':
      distColorCode = '#bd6fc9'
      break
    case '#239a3b':
      distColorCode = '#9a2382'
      break
    case '#196127':
      distColorCode = '#611953'
      break
  }
  return distColorCode
}

const contributions = document.querySelectorAll('rect.day')
for (const contribution of contributions) {
  let filledColor = convertContributionColor(contribution.getAttribute('fill'))
  contribution.setAttribute('fill', filledColor)
}

const legends = document.querySelectorAll('.legend li')
for (const legend of legends) {
  let filledColor = convertContributionColor(legend.getAttribute('style').split(': ')[1])
  legend.setAttribute('style', `background-color: ${filledColor}`)
}