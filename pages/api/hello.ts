import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

/* Gemini AI
 https://aistudio.google.com/usage?project=gen-lang-client-0247104329
api key： AIzaSyDZcMNa7NKW0Naxvto5FwvZg4I9weFMPUc

curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent" \
  -H 'Content-Type: application/json' \
  -H 'X-goog-api-key: GEMINI_API_KEY' \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "Explain how AI works in a few words"
          }
        ]
      }
    ]
  }' 
-->

moonshot AI:
 api key: 
 */


// 初始化 OpenAI 客户端
if (!process.env.MOONSHOT_API_KEY) {
  throw new Error('MOONSHOT_API_KEY 未在 .env.local 中定义')
}

const client = new OpenAI({
  apiKey: process.env.MOONSHOT_API_KEY,
  baseURL: 'https://api.moonshot.cn/v1',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // 处理 OPTIONS 预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: '仅支持 POST 请求' })
  }

  try {
    const { content } = req.body

    if (!content) {
      return res.status(400).json({ error: '缺少用户输入内容' })
    }

    // 设置 SSE 响应头
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache, no-transform')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('X-Accel-Buffering', 'no') // 禁用 Nginx 缓冲（如果适用）

    // 立即发送响应头
    res.flushHeaders()

    // 创建流式请求
    const stream = await client.chat.completions.create({
      model: 'moonshot-v1-8k',
      messages: [
        {
          role: 'system',
          content:
            '你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。',
        },
        { role: 'user', content },
      ],
      temperature: 0.3,
      stream: true,
    })

    // 监听客户端断开连接
    req.on('close', () => {
      console.log('Client disconnected, stopping stream')
      stream.controller?.abort() // 尝试中止 OpenAI 流（视 SDK 支持情况）
      res.end()
    })

    // 逐块发送流式数据
    for await (const chunk of stream) {
      // 检查连接是否已关闭
      if (res.writableEnded || res.finished) {
        console.log('Response closed, stopping stream')
        stream.controller?.abort() // 尝试中止 OpenAI 流
        break
      }

      const delta = chunk.choices[0]?.delta?.content
      if (delta) {
        try {
          console.log('Sending delta: ', delta)
          res.write(`data: ${JSON.stringify({ message: delta })}\n\n`)
        } catch (error) {
          console.log('Write error, client likely disconnected:', error)
          stream.controller?.abort() // 尝试中止 OpenAI 流
          break
        }
      }
    }

    // 流结束
    if (!res.writableEnded) {
      res.write('data: [DONE]\n\n')
      res.end()
    }
  } catch (error) {
    console.error('流式 API 请求失败:', error)
    if (!res.writableEnded) {
      res.status(500).write(`data: ${JSON.stringify({ error: '服务器错误，请稍后重试' })}\n\n`)
      res.end()
    }
  }
}

// 禁用 Next.js 默认的 bodyParser
export const config = {
  api: {
    bodyParser: true,
  },
}