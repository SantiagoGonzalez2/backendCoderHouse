import { Router } from 'express'

const router = Router()

import fs from 'fs'
const readFile = ()  =>{
    const content = fs.readFileSync('data.json', 'utf-8')
    const parseContent = JSON.parse(content)

    return parseContent
}


router.get('/', (req,res) =>{
    res.render('index',{})
})

export default router