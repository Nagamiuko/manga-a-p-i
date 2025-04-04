-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "namedisplay" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "credit" INTEGER NOT NULL DEFAULT 0,
    "total_money" INTEGER NOT NULL DEFAULT 0,
    "avatar" TEXT NOT NULL DEFAULT '',
    "sex" TEXT,
    "isAdmin" TEXT NOT NULL DEFAULT 'user_role',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "a_name" TEXT,
    "t_name" TEXT,
    "tagline" TEXT,
    "synopsis" TEXT,
    "coverImageId" TEXT,
    "price_of_free" INTEGER NOT NULL DEFAULT 0,
    "free" TEXT NOT NULL DEFAULT 'ฟรี',
    "category_main" TEXT,
    "category" TEXT,
    "rating" TEXT,
    "typebook" TEXT,
    "typebook_singer_a_muti" TEXT,
    "typebookAndnovel" TEXT,
    "bookPdfId" TEXT,
    "shopId" TEXT NOT NULL,
    "mangauserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoverImage" (
    "id" TEXT NOT NULL,
    "public_id" TEXT,
    "cover_image_url" TEXT,
    "cover_name" TEXT,

    CONSTRAINT "CoverImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookPDF" (
    "id" TEXT NOT NULL,
    "book_pdf_full" TEXT,
    "book_pdf_try" TEXT,

    CONSTRAINT "BookPDF_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MangaUser" (
    "id" TEXT NOT NULL,

    CONSTRAINT "MangaUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookCategory" (
    "id" TEXT NOT NULL,
    "category_main" TEXT,
    "category" TEXT,
    "rating" TEXT,
    "typebook" TEXT,
    "typebook_singer_a_muti" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL,
    "title_name" TEXT,
    "contents" TEXT,
    "bookId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,
    "imageNumber" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "chapterId" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "cart" JSONB NOT NULL,
    "mailshop" TEXT[],
    "shippingAddress" JSONB NOT NULL,
    "user" JSONB NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Processing',
    "paidAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentInfo" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "paymentId" TEXT,
    "status" TEXT,
    "type" TEXT,

    CONSTRAINT "PaymentInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Book_coverImageId_key" ON "Book"("coverImageId");

-- CreateIndex
CREATE UNIQUE INDEX "Book_bookPdfId_key" ON "Book"("bookPdfId");

-- CreateIndex
CREATE UNIQUE INDEX "CoverImage_public_id_key" ON "CoverImage"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "Image_public_id_key" ON "Image"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "Image_imageNumber_key" ON "Image"("imageNumber");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentInfo_orderId_key" ON "PaymentInfo"("orderId");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_mangauserId_fkey" FOREIGN KEY ("mangauserId") REFERENCES "MangaUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoverImage" ADD CONSTRAINT "CoverImage_id_fkey" FOREIGN KEY ("id") REFERENCES "Book"("coverImageId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookPDF" ADD CONSTRAINT "BookPDF_id_fkey" FOREIGN KEY ("id") REFERENCES "Book"("bookPdfId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentInfo" ADD CONSTRAINT "PaymentInfo_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
