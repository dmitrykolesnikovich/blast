import Scroll from "../ui/views/Scroll"
import Image from "../ui/views/Image"
import {cloud1Png, cloud2Png, cloud3Png} from "../../res"
import {Direction, flipSpriteHorizontally, randomInt} from "../engine"
import LevelButton from "../ui/views/LevelButton"
import gsap from "gsap"

export default function clouds(scroll: Scroll) {
    function randomCloud(): Image {
        const cloudIndex: number = randomInt(0, 2)
        switch (cloudIndex) {
            case 0:
                return new Image({
                    foreground: cloud1Png,
                    size: {width: 275, height: 225}
                })
            case 1:
                return new Image({
                    foreground: cloud2Png,
                    size: {width: 225, height: 175}
                })
            case 2:
                return new Image({
                    foreground: cloud3Png,
                    size: {width: 300, height: 250}
                })
            default:
                throw new Error(`cloudIndex: ${cloudIndex}`)
        }
    }

    function addCloud(buttonIndex: number, direction: Direction) {
        const button: LevelButton = scroll.buttons[buttonIndex]
        const cloud: Image = randomCloud()
        cloud.position = button.position
        const flip: boolean = randomInt(0, 1) === 1
        if (flip) {
            flipSpriteHorizontally(cloud)
        }
        scroll.items.addChild(cloud)

        switch (direction) {
            case 'left': {
                cloud.position.x = 1000
                gsap.timeline({ease: 'linear', repeat: -1})
                    .to(cloud.position, {x: -300, duration: randomInt(20, 30), delay: randomInt(2, 8)})
                    .to(cloud.position, {x: 450, duration: 0})
                break
            }
            case 'right': {
                cloud.position.x = -500
                gsap.timeline({ease: 'linear', repeat: -1})
                    .to(cloud.position, {x: 450, duration: randomInt(20, 30), delay: randomInt(2, 8)})
                    .to(cloud.position, {x: -300, duration: 0})
                break
            }
        }
    }

    addCloud(2, 'left')
    addCloud(10, 'right')
}
