const { composer, middleware } = require("../../core/bot");
const { Markup } = require("telegraf")

let senderId = 0

composer.on("photo",ctx=>{
    const username =ctx.from.username
    senderId = ctx.from.id
    const text = `<b>Jonatuvchi</b>\n@${username}`
    let photo = ctx.message.photo[0].file_id
    let msid = ctx.message.message_id


    ctx.reply(`<b>Qabul qilindi ✅</b>`,{
        reply_to_message_id:msid,
        parse_mode:"HTML"
    }).then()
    const keyboard = Markup.inlineKeyboard([
        Markup.callbackButton("Tasdiqlash ✅","true"),
        Markup.callbackButton("Xato ❌","false")

    ])

    ctx.telegram.sendPhoto(-1001628048404,photo,{
        caption:text,
        parse_mode: "HTML",
        reply_markup: keyboard}).then()
})


composer.action("true",ctx => {
    ctx.telegram.sendMessage(senderId,"Sizning vazifangiz tasdiqlandi").then()
    ctx.editMessageCaption("<b>Tasdiqlandi ✅</b>",{parse_mode:"HTML"}).then()
})


composer.action("false",ctx=>{
    ctx.telegram.sendMessage(senderId,"Sizning vazifangiz xato. Iltimos qayta urunib koring!").then()
    ctx.editMessageCaption("<b>Xato</b>>",{parse_mode:"HTML"}).then()
})

middleware(composer);