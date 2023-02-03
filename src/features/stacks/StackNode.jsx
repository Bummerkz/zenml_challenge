import React, { useState } from "react";
import PropTypes from "prop-types";

import ComponentModal from "features/components/ComponentModal";

import { capitalize } from "app/helpers.js";

const StackNode = ({ data }) => {
  const [isComponentInfoModalOpen, setIsComponentInfoModalOpen] = useState({});

  const { components, ...rest } = data || {};

  return (
    <div className="overflow-hidden bg-blue-400 shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Stack Information
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          {Object.keys(rest).map((key) => (
            <div
              key={key}
              className="bg-cyan-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt className="text-sm font-medium text-gray-500">
                {capitalize(key)}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {rest[key].toString()}
              </dd>
            </div>
          ))}
          <div className="bg-cyan-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Components</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                {Object.keys(components).map((key) => (
                  <li
                    key={key}
                    onClick={() =>
                      setIsComponentInfoModalOpen((prev) => ({
                        ...prev,
                        [key]: true,
                      }))
                    }
                    className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                  >
                    <div className="flex w-0 flex-1 items-center">
                      <span className="ml-2 w-0 flex-1 truncate">{key}</span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button className="font-medium text-indigo-600 hover:text-indigo-500">
                        Info
                      </button>
                    </div>
                    {isComponentInfoModalOpen[key] && (
                      <ComponentModal
                        isOpen={isComponentInfoModalOpen[key]}
                        onToggle={() =>
                          setIsComponentInfoModalOpen((prev) => ({
                            ...prev,
                            [key]: false,
                          }))
                        }
                        componentIds={components[key]}
                        componentName={key}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

StackNode.propTypes = {
  data: PropTypes.object,
};

export default StackNode;
