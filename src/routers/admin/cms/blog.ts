

import express from "express"
const router = express.Router()
import { blogController } from "../../../controllers/admin/cms/blogController"



router.get("/", blogController.getAllBlog)
router.post("/", blogController.addBlog)
router.delete("/:blogId", blogController.deleteBlog)
router.get("/:blogId", blogController.getBlogDataById)
router.patch("/:blogId", blogController.updateBlogById)






export default router