const categoryChoices = {
  C: 'Commerical',
  R: 'Residential',
}

export const categoryChoicesList = Object.entries( categoryChoices ).map(
  ( [ value, label ] ) => ( {
    label,
    value,
  } ),
)
export default categoryChoices
