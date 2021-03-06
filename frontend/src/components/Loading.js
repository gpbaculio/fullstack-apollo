import React from 'react'
import PropTypes from 'prop-types'
import { ClipLoader } from 'react-spinners'
import { css } from 'emotion'

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const Loading = ({ loading }) => (
  <div className="loading-container">
    <ClipLoader
      className={override}
      sizeUnit="px"
      size={100}
      color='#123abc'
      loading={loading}
    />
  </div>
)

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
}

export default Loading

