const statusChoices = {
  A: 'Approved',
  C: 'Connection Released',
  P: 'Pending',
  R: 'Rejected',
}

export const statusChoicesList = Object.entries( statusChoices ).map(
  ( [ value, label ] ) => ( {
    label,
    value,
  } ),
)

export default statusChoices
