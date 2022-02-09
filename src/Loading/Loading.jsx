import React, { Component, Fragment } from 'react';
import style from '../Loading/Loading.module.css'
class Loading extends Component {
    render() {
        return <Fragment>
            <div className={style.loading}>
            </div>
        </Fragment>
    }
}

export default Loading;