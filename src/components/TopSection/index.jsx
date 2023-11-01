import HeroImage from '../HeroImage'
import Navbar from '../Navbar'
import SectionCallToAction from '../SectionCallToAction'
import SectionDescription from '../SectionDescription'
import SectionTitle from '../SectionTitle'

import style from './styles.module.css'

const TopSection = () => {
  return (
    <div className={style.topSection}>
      <Navbar />
      <SectionTitle title={"code tombomb"} color="--primary-dark"/>
      <SectionDescription text="Awakens designs with a sequence of characters" color="--primary-dark"/>
      <SectionCallToAction text="Let's Chat!" color="--primary-dark"/>
      <HeroImage imageSrc="../../public/tom-image.png"/>
    </div>
  )
}

export default TopSection