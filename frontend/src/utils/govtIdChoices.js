const govtIdChoices = {
  0: 'Pan',
  1: 'Aadhar',
  2: 'Voter Id',
  3: 'Passport',
}

export const govtIdChoicesList = Object.entries( govtIdChoices ).map(
  ( [ value, label ] ) => ( {
    label,
    value: parseInt( value ),
  } ),
)

export default govtIdChoices
