/* eslint-disable jsx-a11y/anchor-has-content */
import ActiveLink from './ActiveLink'

const CustomLink = ({ href, ...rest }) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return (
      <ActiveLink href={href} activeClassName="active-link">
        <a {...rest} />
      </ActiveLink>
    )
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />
}

export default CustomLink
