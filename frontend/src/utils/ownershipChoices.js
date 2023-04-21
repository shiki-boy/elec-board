const ownershipChoices = {
  I: 'Individual',
  J: 'Joint',
}

export const ownershipChoicesList = Object.entries( ownershipChoices ).map(
  ( [ value, label ] ) => ( {
    label,
    value,
  } ),
)

export default ownershipChoices
