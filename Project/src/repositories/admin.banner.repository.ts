import { pool } from "../lib/db";
import { Banner } from "../types/banner";

type BannerRow = Banner;

export async function createAdminBanner(imageUrl:string,cloudinaryPubliId:string):Promise<Banner> {
        const result = await pool.query<BannerRow>(
            `
            INSERT INTO banners (image_url,cloudinary_public_id)
            VALUED ($1,$2) 
            RETURNING id,image_url,cloudinary_public_id,created_at,updated_at
            `,[imageUrl,cloudinaryPubliId]
        );
        return result.rows[0];
}

export async function fetchAllAdminBanners():Promise<Banner[] | null> {
    const result = await pool.query<BannerRow>(
        `
        SELECT * FROM banners
        ORDER BY created_at
        `
    )
    return result.rows ?? null;
}