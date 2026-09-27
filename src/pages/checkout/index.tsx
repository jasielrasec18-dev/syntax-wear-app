import { createFileRoute } from "@tanstack/react-router";
import { Logo } from "../../components/Logo";
import lockIcon from "../../assets/images/lock-icon.png";
import checkoutInfoIcon from "../../assets/images/checkout-info-icon.svg";
import checkoutDeliveryRadio from "../../assets/images/checkout-delivery-radio.svg";
import checkoutProductClassicTee from "../../assets/images/checkout-product-classic-tee.svg";
import checkoutProductVintageHoodie from "../../assets/images/checkout-product-vintage-hoodie.svg";
import { useContext, useEffect, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import type { Address } from "../../interfaces/address";
import { formatCurrency } from "../../utils/format-currency";
import { CartContext } from "../../contexts/CartContext/CartContext";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { loadStripe } from "@stripe/stripe-js";

const shippingAddressFormSchema = z.object({
  street: z.string().nonempty("A rua é obrigatória."),
  number: z.coerce.number().min(1, "O número é obrigatório."),
  complement: z.string().optional(),
  neighborhood: z.string().nonempty("O bairro é obrigatório."),
  city: z.string().nonempty("A cidade é obrigatória."),
  state: z.string().nonempty("O estado é obrigatório."),
  cep: z.string().min(8, "CEP inválido."),
});

type ShippingAddressFormData = z.infer<typeof shippingAddressFormSchema>;

async function getCep(cep: string) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  return await response.json();
}

const FRETE_POR_REGIAO: Record<string, number> = {
  Norte: 39.9,
  Nordeste: 29.9,
  "Centro-Oeste": 24.9,
  Sudeste: 14.9,
  Sul: 19.9,
};

interface OrderItem {
  productId: number;
  quantity: number;
  size?: string;
}

async function createStripeCheckout(
  items: OrderItem[],
  shippingAddress: ShippingAddressFormData,
  shippingCost: number,
  paymentMethod: string,
  userId: number,
) {
  const response = await fetch(
    "http://localhost:3000/stripe/checkout",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items,
        paymentMethod,
        shippingAddress,
        shippingCost,
        userId,
      }),
    },
  );

  return await response.json();
}

export const Route = createFileRoute("/checkout/")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const {
    register,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ShippingAddressFormData>({
    resolver: zodResolver(
      shippingAddressFormSchema,
    ) as unknown as Resolver<ShippingAddressFormData>,
    defaultValues: {
      street: "" as any,
      number: "" as any,
      complement: "" as any,
      neighborhood: "" as any,
      city: "" as any,
      state: "" as any,
      cep: "" as any,
    },
    mode: "onBlur",
  });

  const [address, setAddress] = useState<Address | null>(null);

  const { cart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const cepValue = watch("cep");

  useEffect(() => {
    if (cepValue.length !== 8) return;

    async function fetchData() {
      const data = await getCep(cepValue);

      const shippingCost = FRETE_POR_REGIAO[data.regiao];

      setAddress({
        ...data,
        shippingCost,
      });

      setValue("street", data.logradouro);
      (setValue("neighborhood", data.bairro),
        setValue("city", data.localidade));
      setValue("state", data.uf);
    }

    fetchData();
  }, [cepValue]);

  const redirectToCheckout = async () => {
    if (!address) return;

    const shippingData = getValues();

    const paymentMethod = "credit_card";

    const items = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      size: item.sizes[0],
    }));

    const { sessionId } = await createStripeCheckout(
      items,
      shippingData,
      address?.shippingCost,
      paymentMethod,
      user?.id!,
    );

    if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) return;

    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

    stripe?.redirectToCheckout({
      sessionId,
    });
  };

  return (
    <div className="min-h-screen">
      <header className="bg-white mb-10">
        <div className="container flex items-center justify-between py-6">
          <Logo />

          <div className="flex items-center gap-2 text-black">
            <img src={lockIcon} alt="" />
            <p>100% seguro</p>
          </div>
        </div>
      </header>

      <div className="container pb-10 ">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="w-full max-w-[684px]">
            <section className="w-full max-w-[684px] space-y-10">
              <div className="space-y-4 rounded-md bg-white p-4">
                <h2 className="text-[20px] leading-7 font-medium text-black">
                  Identificação
                </h2>

                <div className="space-y-1 text-sm leading-5 text-[#C5C5C5]">
                  <p>robertodias@gmail.com</p>
                  <p>Roberto Dias</p>
                </div>

                <div className="relative rounded-md border border-[#E5E7EB]">
                  <div className="flex items-start gap-2 rounded-md bg-[#F5F5F7] p-2">
                    <img src={checkoutInfoIcon} alt="" />
                    <div>
                      <p className="text-xs leading-4 text-black">
                        Antes de continuar, verifique se o telefone para contato
                        está correto.
                      </p>
                      <p className="text-base leading-6 font-medium text-black">
                        13 82382378
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="absolute right-3 bottom-2 text-sm leading-5 text-[#339CF1] underline"
                  >
                    editar telefone
                  </button>
                </div>
              </div>

              <section className="mt-10 w-full max-w-[684px] space-y-10">
                <div className="space-y-4">
                  <h3 className="text-[20px] leading-7 font-medium text-[#333132]">
                    Informe seu endereço
                  </h3>

                  <form className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="cep"
                          className="h-[46px] w-full rounded border border-[#D1D5DC] px-2 text-base text-black placeholder:text-black/50 bg-white"
                          {...register("cep")}
                        />
                        <button
                          type="button"
                          className="h-[42px] rounded bg-black px-4 text-base leading-6 text-white"
                        >
                          Buscar
                        </button>
                      </div>
                      {errors.cep && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.cep.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label
                        className="text-base leading-6 text-black"
                        htmlFor="street"
                      >
                        Endereço
                      </label>
                      <input
                        id="street"
                        type="text"
                        placeholder="street"
                        className="h-[46px] w-full rounded border border-[#D1D5DC] px-2 text-base text-black placeholder:text-black/50 bg-white"
                        {...register("street")}
                      />
                      {errors.street && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.street.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label
                          className="text-base leading-6 text-black"
                          htmlFor="number"
                        >
                          Número
                        </label>
                        <input
                          id="number"
                          type="text"
                          placeholder="number"
                          className="h-[46px] w-full rounded border border-[#D1D5DC] px-2 text-base text-black placeholder:text-black/50 bg-white"
                          {...register("number")}
                        />
                        {errors.number && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.number.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label
                          className="text-base leading-6 text-black"
                          htmlFor="complement"
                        >
                          Complemento
                        </label>
                        <input
                          id="complement"
                          type="text"
                          placeholder="complement"
                          className="h-[46px] w-full rounded border border-[#D1D5DC] px-2 text-base text-black placeholder:text-black/50 bg-white"
                          {...register("complement")}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label
                        className="text-base leading-6 text-black"
                        htmlFor="neighborhood"
                      >
                        Bairro
                      </label>
                      <input
                        id="neighborhood"
                        type="text"
                        placeholder="neighborhood"
                        className="h-[46px] w-full rounded border border-[#D1D5DC] px-2 text-base text-black placeholder:text-black/50 bg-white"
                        {...register("neighborhood")}
                      />
                      {errors.neighborhood && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.neighborhood.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label
                          className="text-base leading-6 text-black"
                          htmlFor="city"
                        >
                          Cidade
                        </label>
                        <input
                          id="city"
                          type="text"
                          placeholder="city"
                          className="h-[46px] w-full rounded border border-[#D1D5DC] px-2 text-base text-black placeholder:text-black/50 bg-white"
                          {...register("city")}
                        />
                        {errors.city && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.city.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label
                          className="text-base leading-6 text-black"
                          htmlFor="state"
                        >
                          Estado
                        </label>
                        <input
                          id="state"
                          type="text"
                          placeholder="state"
                          className="h-[46px] w-full rounded border border-[#D1D5DC] px-2 text-base text-black placeholder:text-black/50 bg-white"
                          {...register("state")}
                        />
                        {errors.state && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.state.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </form>
                </div>

                {address && (
                  <div className="space-y-4">
                    <h3 className="text-[20px] leading-7 font-medium text-[#333132]">
                      Escolha a forma de entrega
                    </h3>

                    <label className="flex w-full cursor-pointer items-start gap-4 rounded-lg border border-[#E5E7EB] p-4">
                      <img
                        src={checkoutDeliveryRadio}
                        alt=""
                        className="mt-1 h-5 w-4"
                      />
                      <div className="w-full space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-base leading-6 font-medium text-[#333132]">
                            Entrega rápida
                          </p>
                          <p className="text-base leading-6 font-medium text-[#333132]">
                            {formatCurrency(address.shippingCost)}
                          </p>
                        </div>
                        <p className="text-sm leading-5 text-[#6A7282]">
                          Receba em até 5 dias úteis
                        </p>
                      </div>
                    </label>
                  </div>
                )}
              </section>
            </section>
          </div>

          <aside className="w-full max-w-[322px] rounded-md bg-white flex flex-col h-[calc(100dvh-116px)]">
            <div className="flex-1 flex flex-col px-5 pt-5 overflow-hidden">
              <h2 className="text-2xl leading-8 font-medium text-[#585858] mb-4">
                Resumo do pedido
              </h2>

              <div className="flex-1 overflow-y-auto pr-5 border-r border-[#B3B3B3]">
                <div className="space-y-4">
                  <div className="border-b border-[#B3B3B3] pb-4">
                    <div className="flex gap-4">
                      <img
                        src={checkoutProductClassicTee}
                        alt="Classic Tee"
                        className="h-16 w-16"
                      />
                      <div>
                        <p className="pb-1 text-sm leading-5 text-black">
                          Classic Tee
                        </p>
                        <p className="pb-1 text-xs leading-4 text-black">
                          Quantidade: 1
                        </p>
                        <p className="text-base leading-6 text-black">
                          <span className="font-medium">R$ 29,99</span> à vista
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pb-4">
                    <div className="flex gap-4">
                      <img
                        src={checkoutProductVintageHoodie}
                        alt="Vintage Hoodie"
                        className="h-16 w-16"
                      />
                      <div>
                        <p className="pb-1 text-sm leading-5 text-black">
                          Vintage Hoodie
                        </p>
                        <p className="pb-1 text-xs leading-4 text-black">
                          Quantidade: 1
                        </p>
                        <p className="text-base leading-6 text-black">
                          <span className="font-medium">R$ 59,90</span> à vista
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F3F4F6] px-5 py-3">
              <div className="flex items-center justify-between text-sm leading-5 text-[#252525]">
                <p>Subtotal</p>
                <p className="font-medium">R$ 89,89</p>
              </div>
              <div className="flex items-center justify-between text-sm leading-5 text-[#252525]">
                <p>Frete</p>
                <p>
                  {address
                    ? formatCurrency(address.shippingCost)
                    : "A calcular"}
                </p>
              </div>
              <div className="flex items-center justify-between pb-3 text-sm leading-5 text-[#252525]">
                <p>Total</p>
                <p className="font-medium">R$ 89,89 à vista</p>
              </div>

              <button
                type="button"
                className="w-full rounded-lg cursor-pointer bg-black py-3 text-base leading-6 text-white shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)]"
                onClick={redirectToCheckout}
                disabled={!address}
              >
                Fechar pedido
              </button>
            </div>
          </aside>
        </div>
      </div>

      <footer className="p-4 bg-white">
        <p className="text-[#4A5565] text-center">
          Preços e condições exclusivos para o site www.iplace.com.br e para o
          televendas, podendo sofrer alterações sem prévia notificação. Global
          Distribuição de Bens de Consumo LTDA / www.iplace.com.br / BR 116, km
          223,5, Nº 7350 / Dois Irmãos - RS / CEP 93950-000 / CNPJ:
          89.237.911/0001-40
        </p>
      </footer>
    </div>
  );
}