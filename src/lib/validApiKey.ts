import { HumanMessage } from '@langchain/core/messages'
import axios from 'axios'
import { ChatOpenAI } from 'langchain/chat_models/openai'

export const validateApiKey = async (
  openAIApiKey: string,
): Promise<boolean> => {
  const model = new ChatOpenAI({ openAIApiKey })
  try {
    await model.invoke([new HumanMessage("Say Ok")])
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}
