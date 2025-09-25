import mongoose from "mongoose"

const coursSchema = new mongoose.Schema({
    courseTitle: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    courseLevel: {
        type: String,
        enum: ["Начальный", "Средний", "Продвинутый"],
    },
    coursePrice: {
        type: Number,
        required: true,
    },

    enrolledStudent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    lectures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "lecture",
        },
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    studentLearning: {
        type: String,
        required: true,
    },
    courseLanguage: {
        type: String,
        enum: ["English", "Русский"],
    },
})

export const Course =
    mongoose.models.Course || mongoose.model("Course", coursSchema)
