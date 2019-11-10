/** @jsx jsx */
import { graphql, Link, useStaticQuery } from "gatsby"
import { css } from "@emotion/core"
import { jsx } from "theme-ui"

const routeListItem = css`
  margin-bottom: 8px;

  a {
    box-shadow: none;
    color: black;
    text-decoration: none;
  }

  a:hover {
    color: #007acc;
  }
`

function Nav(props) {
  const data = useStaticQuery(graphql`
    query NavQuery {
      site {
        siteMetadata {
          siteRoutes {
            url
            label
          }
        }
      }
    }
  `)

  const siteRoutes = data.site.siteMetadata.siteRoutes

  const pageLinks = siteRoutes.map(route => {
    return (
      <li
        key={`route-${route.label.toLowerCase()}`}
        css={routeListItem}
        sx={{
          margin: [`0 16px 0 0`, "0"],
        }}
      >
        <Link
          to={route.url}
          getProps={props => {
            return props.isCurrent ? { style: { color: "#007acc" } } : null
          }}
        >
          {route.label}
        </Link>
      </li>
    )
  })

  return (
    <ul
      sx={{
        display: `flex`,
        listStyle: `none`,
        margin: `0`,
        padding: `8px 0`,
        flexDirection: [`row`, `column`],
      }}
    >
      {pageLinks}
    </ul>
  )
}

export default Nav
