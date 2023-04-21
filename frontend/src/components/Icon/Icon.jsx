const Icon = ( {
  className = 'dark md', // used for filling color
  IconComponent,
  ...rest
} ) => <IconComponent className={ className } { ...rest } />

export default Icon

/*
className = primary | danger | accent | light | dark
size = sm | md | lg | xl
*/
