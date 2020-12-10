const discord = require('discord.js')
const request = require('request')
const dotenv = require('dotenv')
dotenv.config()

const client = new discord.Client()

const url = "https://warm-coast-67853.herokuapp.com/meeting/pending"
const options = { json: true }



client.on('message', (message) => {
	
	if (message.content === 'meeting') {

                  request(url, options, (error, res, body) => {
						if (error) {
                            message.channel.send("Something went wrong")
							return console.log(error)
                        }
                        

						if (!error && res.statusCode == 200) {
                            let response = ''
                         
                            const arr1 = res.body
                            
                            for(let i=0;i<arr1.length;i++)
                            {
                                  let url1 ='https://warm-coast-67853.herokuapp.com/user/' +arr1[i].user_id
                                let mydate = new Date(arr1[i].dateAndtime * 1000)
                                mydate = mydate.toLocaleString('hi-IN', {
									timeZone: 'Asia/Kolkata',
								})
                                response += "\`\`\`json\n"
                                response += '\"Meeting Topic - '+arr1[i].topic+'\"\n'
                                response+='\"Details -' +arr1[i].description+'\"\n'
                                response+='\"Timing - ' +mydate+'\"\n'
                                response+='\"Organizer- '+url1+'\"\n'
                                response+='\"Attendees-'+arr1[i].attendees+'\"\n'
                                response+="\`\`\`\n"

                            }
							
                           if(response=='')
                           message.channel.send("\`\`\`diff\n- No meeting is there !\n\`\`\`")
                           else
							message.channel.send(response)
						}
					})
	}
})

client.login(process.env.DISCORD_API)