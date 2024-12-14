<script setup lang="ts">
import { type RegleExternalErrorTree } from '@regle/core';
import { and, checked, dateBefore, email, minLength, required, sameAs, withMessage } from '@regle/rules';
import { withTooltip } from '@regle/rules';
import { ref } from 'vue';
import { useCustomRegle } from './validations/regle.global.config';
import { checkPseudo } from './validations/custom-rules/check-pseudo.rule';
import { strongPassword } from './validations/custom-rules/strong-password.rule';
import MyInput from './components/MyInput.vue';

interface Form {
  pseudo?: string;
  password?: string;
  confirmPassword?: string;
}

const externalErrors = ref<RegleExternalErrorTree<Form>>({});

const form = ref<Form>({});

const { r$ } = useCustomRegle(
  form,
  {
    pseudo: { required, checkPseudo },
    password: { required, strongPassword: strongPassword() },
    confirmPassword: {
      required,
      sameAs: withMessage(
        sameAs(() => form.value.password),
        "Your passwords don't match"
      ),
    },
  },
  {
    externalErrors,
  }
);

async function submit() {
  const { result, data } = await r$.$validate();
  if (result) {
    alert('Your form is valid!');
    console.log(data);
    //           ^ Hover type here to see type safe result
  }
}
</script>

<template>
  <div class="px-6 text-gray-900 antialiased">
    <div class="mx-auto max-w-xl divide-y py-12 md:max-w-4xl">
      <div class="py-12 flex flex-col justify-center items-center">
        <h2 class="text-2xl font-bold">Advanced Regle</h2>
        <div class="mt-8 w-96 max-w-md">
          <div class="grid grid-cols-1 gap-6">
            <MyInput
              v-model="form.pseudo"
              :field="r$.$fields.pseudo"
              label="Pseudo"
              placeholder="Type your unique pseudo"
            />
            <div class="flex justify-between">
              <button
                class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                @click="r$.$resetAll"
              >
                Reset
              </button>
              <button
                class="bg-indigo-500 text-white hover:bg-indigo-600 font-semibold py-2 px-4 rounded shadow"
                @click="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
