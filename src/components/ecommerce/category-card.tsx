import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Category } from "@/types/product";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-5 border border-slate-200/80 shadow-subtle hover:shadow-card-hover hover:border-brand-300 transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
            {category.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {category.itemCount || 0}+ sản phẩm
          </p>
        </div>

        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-50">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
    </Link>
  );
}
