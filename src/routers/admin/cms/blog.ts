

import express from "express"
const router = express.Router()
import { blogController } from "../../../controllers/admin/cms/blogController"




//tag

router.get("/tag", blogController.getAllBlogTags)
router.post("/create-tag", blogController.createBlogTag)
router.delete("/delete-tag", blogController.deleteBlogTag)

//category

router.get("/category", blogController.getAllBlogCategory)
router.post("/create-category", blogController.createBlogCategory)
router.delete("/delete-category", blogController.deleteBlogCategory)



//blog

router.get("/", blogController.getAllBlog)
router.post("/", blogController.addBlog)
router.delete("/:blogId", blogController.deleteBlog)
router.get("/:blogId", blogController.getBlogDataById)
router.patch("/:blogId", blogController.updateBlogById)
router.patch("/:blogId/update-status", blogController.updateBlogStatus)


export default router