import Color from "color"

interface DarumaColors {
    backgroundColor: string,
    outlineColor: string,
    faceColor: string,
    bodyColor: string,
    accentColor: string
}
const colorCalculate = (color: string): DarumaColors => {
    color = color?.replace('\'', '').replace('"', '')
    if(!color) color='#F00'
    let primaryColor = new Color(color)
    if(primaryColor.luminosity() < .2) primaryColor = primaryColor.lightness(20)
    if(primaryColor.luminosity() > .8) primaryColor = primaryColor.lightness(80)
    let lightColor = new Color({r: 225, g: 225, b: 225})
    let darkColor = new Color({r: 30, g: 30, b: 30})
    return {
        backgroundColor: Color({r: 0, g: 0, b: 0}).rgb().string(),
        outlineColor: primaryColor.luminosity() > .5 ? lightColor.rgb().string() : darkColor.rgb().string(),
        faceColor: primaryColor.luminosity() > .5 ? darkColor.rgb().string() : lightColor.rgb().string(),
        bodyColor: primaryColor.rgb().string(),
        accentColor: Color({r: 255 - primaryColor.red(), g: 255 - primaryColor.green(), b: 255 - primaryColor.blue()}).rgb().string()
    } as DarumaColors
}

export { colorCalculate, DarumaColors}