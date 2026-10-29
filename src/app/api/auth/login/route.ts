import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import bcrypt from "bcryptjs";
import { getPool } from "../../../../lib/db";
import type { User } from "../../../../lib/data";
import { createSessionToken } from "../../../../lib/auth";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().trim().min(1, "Ничего же не набрал!..").email("Фигню какую-то набрал! Это не почта."),
  password: z.string().trim().min(1, "Напиши что-нибудь..."),
});

async function checkUser(email: string) {
  try {
    const pool = getPool(); 
    const [result] = await pool.execute<RowDataPacket[]>(
      `SELECT * FROM users WHERE email=?`,
      [email],
    );
    if (result.length === 0) {
      return null;
    } else {
      return result[0] as User;
    }
  } catch (error) {
    throw new Error("Ошибка проверки пользователя.");
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedFields = await LoginSchema.safeParseAsync(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { errors: validatedFields.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { password, email } = validatedFields.data;
    const user = await checkUser(email);
    if (!user) {
      return NextResponse.json(
        { errors: { email: ["Неверный E-mail"] } },
        { status: 400 },
      );
    }
    const passwordIsAvailable = await bcrypt.compare(
      password,
      user.password_hash,
    );
    if (!passwordIsAvailable) {
      return NextResponse.json(
        { errors: { password: ["Неверный пароль"] } },
        { status: 400 },
      );
    }

    const token = await createSessionToken(user.id);

    const response = NextResponse.json({ status: 201 });

    response.cookies.set({
      name: "cult_session", 
      value: token,
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Ошибка:", error);
    return NextResponse.json(
      { error: "Не удалось войти в админку" },
      { status: 500 },
    );
  }
}
