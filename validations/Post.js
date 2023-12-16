import {body} from 'express-validator';


export const postCreateValidation = [
    body('title').isLength({min:3}).isString(),
    body('genre').isLength({min:3}).isString(),
  /* body('type').optional().isLength({min:3}).isString(),
    body('releaseDate').optional().isDate,
    body('developer').optional().isLength({min:3}).isString(),
    body('publisher').optional().isLength({min:3}).isString(),
    body('localization').optional().isLength({min:3}).isString(),
    body('userRating').optional().isNumeric(),
    body('ageRating').optional().isString(),
    body('description').optional().isLength({min:10}).isString(),
    body('logoUrl').optional().isLength({min:3}).isString(),
    body('devices').optional().isLength({min:3}).isString(), */
   /*  body('series').Optional(), */ 

]