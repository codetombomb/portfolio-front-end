import React from 'react'
import Navbar from '../Navbar'
import SectionTitle from '../SectionTitle'

import style from './styles.module.css'

const TopSection = () => {
  return (
    <div className={style.topSection}>
      <Navbar />
      <SectionTitle title={"code tombomb"} color="--primary-dark"/>
    </div>
  )
}

export default TopSection