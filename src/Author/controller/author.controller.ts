import express from "express";
import { Genre, PrismaClient } from "@prisma/client";
import { Book, MediaSocial } from "@prisma/client";

const db = new PrismaClient();

interface Author {
  id: number;
  name: string;
  email: string;
  joinDate: Date;
  books: Book[],
  mediaSocials: MediaSocial[]
}

const createRecord = async (
  req: express.Request,
  res: express.Response
) => {
  const { name, email, joinDate, books, mediaSocials }: Author = req.body;
  res.setHeader('Content-Type', 'application/json');

  //Check if email is not duplicate
  const emailDuplicate = await db.author.findUnique({
    where:{
      email: email
    }
  })

  if(emailDuplicate){
    res.json({
      field: "email",
      message: "Email is duplicate!"
    });
    console.log(emailDuplicate);
  }

  //Check if genre is exists from enum schema
  books.forEach(book => {
    if (!Object.values(Genre).includes(book.genre)) {
      res.json({
        field: "genre",
        message: "Genre is not valid"
      });
    }
    console.log(book.genre);
  });

  const newAuthor = await db.author.create({
    data: {
      name,
      email,
      joinDate,
      books: {
        create: books
      },
      mediaSocials: {
        create: mediaSocials,
      },
    },
    include: {
      books: true,
      mediaSocials: true,
    },
  });
  res.status(200).json({
    statusCode: res.statusCode,
    data: newAuthor
  })
  console.log({ name, email, joinDate, books, mediaSocials });
};

const getAuthorById = async (req: express.Request, res: express.Response) => {
  const {id} = req.params;
  const author = await db.author.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      books: true,
      mediaSocials: true
    }
  })

  author 
  ? res.status(200).json({
    status: res.statusCode,
    data: author
  }) 
  : res.status(404).json({
    status: res.statusCode,
    message: `Id [${id}] not found!`
  })  
}

const getAllRecords = async (
  req: express.Request, 
  res: express.Response
) => {
  const records = await db.author.findMany({
      include: {
          books: true,
          mediaSocials: true
      }
  });
  res.status(200).json({
    status: res.statusCode,
    data: records
  })    
}

const updateRecords = async (req: express.Request, res: express.Response) => {
  const {id} = req.params;
  const { name, email, joinDate, books, mediaSocials }: Author = req.body;

  const idAuthor = await db.author.findUnique({where: {id: Number(id)}})
  idAuthor 
  ? res.status(404).json({
    status: res.statusCode,
    message: `Id [] not found.`
  }) : res.status(404).json({

    });
}

export default {
  save: createRecord,
  findAll: getAllRecords,
  getById: getAuthorById
}