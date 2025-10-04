import z from "zod";

export const LoginSchema = z.object({
name: z
.string()
.min(1, { message: 'لطفاً اسم خود را وارد کنید' })
.max(50, { message: 'اسم نمی‌تواند بیش از 50 کاراکتر باشد' }),
})