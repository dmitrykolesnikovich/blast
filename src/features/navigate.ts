import {context, View} from "../engine"

export default function navigate(view: View) {
    context.layout.replaceAt(0, view)
}