import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import { Dialog } from "@headlessui/react";

import { capitalize } from "app/helpers.js";

import {
  getComponents,
  selectComponents,
  selectComponentsByIds,
} from "app/componentsSlice";

const ComponentModal = ({ isOpen, onToggle, componentName, componentIds }) => {
  const components = useSelector(selectComponents);
  const componentsByIds = useSelector(selectComponentsByIds(componentIds));
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (!components) dispatch(getComponents());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog as="div" className="relative z-10" open={isOpen} onClose={onToggle}>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {capitalize(componentName)} information:
                  </Dialog.Title>
                  <div className="mt-2">
                    {componentsByIds.map((component) => (
                      <div key={component.id}>
                        <div className="px-4 py-5 sm:px-6">
                          <h3 className="text-lg font-medium leading-6 text-gray-900">
                            {component.name}
                          </h3>
                        </div>
                        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                          <div className="border-t border-gray-200">
                            <dl>
                              {Object.keys(component).map((key) => (
                                <div
                                  key={key}
                                  className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                                >
                                  <dt className="text-sm font-medium text-gray-500">
                                    {capitalize(key)}
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    {typeof component[key] === "object" ? (
                                      <textarea
                                        readOnly
                                        className="form-control block w-full h-fit px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        value={JSON.stringify(component[key])}
                                      />
                                    ) : (
                                      component[key].toString()
                                    )}
                                  </dd>
                                </div>
                              ))}
                            </dl>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={onToggle}
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

ComponentModal.propTypes = {
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func,
  componentName: PropTypes.string,
  componentIds: PropTypes.array,
};

export default ComponentModal;
