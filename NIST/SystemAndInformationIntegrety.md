

----


h2. *SI-1*: SYSTEM AND INFORMATION INTEGRITY POLICY AND PROCEDURES

This control addresses the establishment of policy and procedures for the effective implementation of selected security controls and control enhancements in the SI family. Policy and procedures reflect applicable federal laws, Executive Orders, directives, regulations, policies, standards, and guidance. Security program policies and procedures at the organization level may make the need for system-specific policies and procedures unnecessary. The policy can be included as part of the general information security policy for organizations or conversely, can be represented by multiple policies reflecting the complex nature of certain organizations. The procedures can be established for the security program in general and for particular information systems, if needed. The organizational risk management strategy is a key factor in establishing policy and procedures.


h3. The organization:

* *SI-1a.*: Develops, documents, and disseminates to [Assignment: organization-defined personnel or roles]:
** *SI-1a.1.*: A system and information integrity policy that addresses purpose, scope, roles, responsibilities, management commitment, coordination among organizational entities, and compliance; and
** *SI-1a.2.*: Procedures to facilitate the implementation of the system and information integrity policy and associated system and information integrity controls; and
* *SI-1b.*: Reviews and updates the current:
** *SI-1b.1.*: System and information integrity policy [Assignment: organization-defined frequency]; and
** *SI-1b.2.*: System and information integrity procedures [Assignment: organization-defined frequency].


----


h2. *SI-2*: FLAW REMEDIATION

Organizations identify information systems affected by announced software flaws including potential vulnerabilities resulting from those flaws, and report this information to designated organizational personnel with information security responsibilities. Security-relevant software updates include, for example, patches, service packs, hot fixes, and anti-virus signatures. Organizations also address flaws discovered during security assessments, continuous monitoring, incident response activities, and system error handling. Organizations take advantage of available resources such as the Common Weakness Enumeration (CWE) or Common Vulnerabilities and Exposures (CVE) databases in remediating flaws discovered in organizational information systems. By incorporating flaw remediation into ongoing configuration management processes, required/anticipated remediation actions can be tracked and verified. Flaw remediation actions that can be tracked and verified include, for example, determining whether organizations follow US-CERT guidance and Information Assurance Vulnerability Alerts. Organization-defined time periods for updating security-relevant software and firmware may vary based on a variety of factors including, for example, the security category of the information system or the criticality of the update (i.e., severity of the vulnerability related to the discovered flaw). Some types of flaw remediation may require more testing than other types. Organizations determine the degree and type of testing needed for the specific type of flaw remediation activity under consideration and also the types of changes that are to be configuration-managed. In some situations, organizations may determine that the testing of software and/or firmware updates is not necessary or practical, for example, when implementing simple anti-virus signature updates. Organizations may also consider in testing decisions, whether security-relevant software or firmware updates are obtained from authorized sources with appropriate digital signatures.


h3. The organization:

* *SI-2a.*: Identifies, reports, and corrects information system flaws;
* *SI-2b.*: Tests software and firmware updates related to flaw remediation for effectiveness and potential side effects before installation;
* *SI-2c.*: Installs security-relevant software and firmware updates within [Assignment: organization-defined time period] of the release of the updates; and
* *SI-2d.*: Incorporates flaw remediation into the organizational configuration management process.


----


h2. *SI-3*: MALICIOUS CODE PROTECTION

Information system entry and exit points include, for example, firewalls, electronic mail servers, web servers, proxy servers, remote-access servers, workstations, notebook computers, and mobile devices. Malicious code includes, for example, viruses, worms, Trojan horses, and spyware. Malicious code can also be encoded in various formats (e.g., UUENCODE, Unicode), contained within compressed or hidden files, or hidden in files using steganography. Malicious code can be transported by different means including, for example, web accesses, electronic mail, electronic mail attachments, and portable storage devices. Malicious code insertions occur through the exploitation of information system vulnerabilities. Malicious code protection mechanisms include, for example, anti-virus signature definitions and reputation-based technologies. A variety of technologies and methods exist to limit or eliminate the effects of malicious code. Pervasive configuration management and comprehensive software integrity controls may be effective in preventing execution of unauthorized code. In addition to commercial off-the-shelf software, malicious code may also be present in custom-built software. This could include, for example, logic bombs, back doors, and other types of cyber attacks that could affect organizational missions/business functions. Traditional malicious code protection mechanisms cannot always detect such code. In these situations, organizations rely instead on other safeguards including, for example, secure coding practices, configuration management and control, trusted procurement processes, and monitoring practices to help ensure that software does not perform functions other than the functions intended. Organizations may determine that in response to the detection of malicious code, different actions may be warranted. For example, organizations can define actions in response to malicious code detection during periodic scans, actions in response to detection of malicious downloads, and/or actions in response to detection of maliciousness when attempting to open or execute files.


h3. The organization:

* *SI-3a.*: Employs malicious code protection mechanisms at information system entry and exit points to detect and eradicate malicious code;
* *SI-3b.*: Updates malicious code protection mechanisms whenever new releases are available in accordance with organizational configuration management policy and procedures;
* *SI-3c.*: Configures malicious code protection mechanisms to:
** *SI-3c.1.*: Perform periodic scans of the information system [Assignment: organization-defined frequency] and real-time scans of files from external sources at [Selection (one or more); endpoint; network entry/exit points] as the files are downloaded, opened, or executed in accordance with organizational security policy; and
** *SI-3c.2.*: [Selection (one or more): block malicious code; quarantine malicious code;  send alert to administrator; [Assignment: organization-defined action]] in response to malicious code detection; and
* *SI-3d.*: Addresses the receipt of false positives during malicious code detection and eradication and the resulting potential impact on the availability of the information system.


----


h2. *SI-4*: INFORMATION SYSTEM MONITORING

Information system monitoring includes external and internal monitoring. External monitoring includes the observation of events occurring at the information system boundary (i.e., part of perimeter defense and boundary protection). Internal monitoring includes the observation of events occurring within the information system. Organizations can monitor information systems, for example, by observing audit activities in real time or by observing other system aspects such as access patterns, characteristics of access, and other actions. The monitoring objectives may guide determination of the events. Information system monitoring capability is achieved through a variety of tools and techniques (e.g., intrusion detection systems, intrusion prevention systems, malicious code protection software, scanning tools, audit record monitoring software, network monitoring software). Strategic locations for monitoring devices include, for example, selected perimeter locations and near server farms supporting critical applications, with such devices typically being employed at the managed interfaces associated with controls SC-7 and AC-17. Einstein network monitoring devices from the Department of Homeland Security can also be included as monitoring devices. The granularity of monitoring information collected is based on organizational monitoring objectives and the capability of information systems to support such objectives. Specific types of transactions of interest include, for example, Hyper Text Transfer Protocol (HTTP) traffic that bypasses HTTP proxies. Information system monitoring is an integral part of organizational continuous monitoring and incident response programs. Output from system monitoring serves as input to continuous monitoring and incident response programs. A network connection is any connection with a device that communicates through a network (e.g., local area network, Internet). A remote connection is any connection with a device communicating through an external network (e.g., the Internet). Local, network, and remote connections can be either wired or wireless.


h3. The organization:

* *SI-4a.*: Monitors the information system to detect:
** *SI-4a.1.*: Attacks and indicators of potential attacks in accordance with [Assignment: organization-defined monitoring objectives]; and
** *SI-4a.2.*: Unauthorized local, network, and remote connections;
* *SI-4b.*: Identifies unauthorized use of the information system through [Assignment: organization-defined techniques and methods];
* *SI-4c.*: Deploys monitoring devices:
** *SI-4c.1.*: Strategically within the information system to collect organization-determined essential information; and
** *SI-4c.2.*: At ad hoc locations within the system to track specific types of transactions of interest to the organization;
* *SI-4d.*: Protects information obtained from intrusion-monitoring tools from unauthorized access, modification, and deletion;
* *SI-4e.*: Heightens the level of information system monitoring activity whenever there is an indication of increased risk to organizational operations and assets, individuals, other organizations, or the Nation based on law enforcement information, intelligence information, or other credible sources of information;
* *SI-4f.*: Obtains legal opinion with regard to information system monitoring activities in accordance with applicable federal laws, Executive Orders, directives, policies, or regulations; and
* *SI-4g.*: Provides [Assignment: organization-defined information system monitoring information] to [Assignment: organization-defined personnel or roles] [Selection (one or more): as needed; [Assignment: organization-defined frequency]].


----


h2. *SI-5*: SECURITY ALERTS, ADVISORIES, AND DIRECTIVES

The United States Computer Emergency Readiness Team (US-CERT) generates security alerts and advisories to maintain situational awareness across the federal government. Security directives are issued by OMB or other designated organizations with the responsibility and authority to issue such directives. Compliance to security directives is essential due to the critical nature of many of these directives and the potential immediate adverse effects on organizational operations and assets, individuals, other organizations, and the Nation should the directives not be implemented in a timely manner. External organizations include, for example, external mission/business partners, supply chain partners, external service providers, and other peer/supporting organizations.


h3. The organization:

* *SI-5a.*: Receives information system security alerts, advisories, and directives from [Assignment: organization-defined external organizations] on an ongoing basis;
* *SI-5b.*: Generates internal security alerts, advisories, and directives as deemed necessary;
* *SI-5c.*: Disseminates security alerts, advisories, and directives to: [Selection (one or more): [Assignment: organization-defined personnel or roles]; [Assignment: organization-defined elements within the organization]; [Assignment: organization-defined external organizations]]; and
* *SI-5d.*: Implements security directives in accordance with established time frames, or notifies the issuing organization of the degree of noncompliance.


----


h2. *SI-6*: SECURITY FUNCTION VERIFICATION

Transitional states for information systems include, for example, system startup, restart, shutdown, and abort. Notifications provided by information systems include, for example, electronic alerts to system administrators, messages to local computer consoles, and/or hardware indications such as lights.


h3. The information system:

* *SI-6a.*: Verifies the correct operation of [Assignment: organization-defined security functions];
* *SI-6b.*: Performs this verification [Selection (one or more): [Assignment: organization-defined system transitional states]; upon command by user with appropriate privilege; [Assignment: organization-defined frequency]];
* *SI-6c.*: Notifies [Assignment: organization-defined personnel or roles] of failed security verification tests; and
* *SI-6d.*: [Selection (one or more): shuts the information system down; restarts the information system; [Assignment: organization-defined alternative action(s)]] when anomalies are discovered.


----


h2. *SI-7*: SOFTWARE, FIRMWARE, AND INFORMATION INTEGRITY

Unauthorized changes to software, firmware, and information can occur due to errors or malicious activity (e.g., tampering). Software includes, for example, operating systems (with key internal components such as kernels, drivers), middleware, and applications. Firmware includes, for example, the Basic Input Output System (BIOS). Information includes metadata such as security attributes associated with information. State-of-the-practice integrity-checking mechanisms (e.g., parity checks, cyclical redundancy checks, cryptographic hashes) and associated tools can automatically monitor the integrity of information systems and hosted applications.


h3. The organization employs integrity verification tools to detect unauthorized changes to [Assignment: organization-defined software, firmware, and information].



----


h2. *SI-8*: SPAM PROTECTION

Information system entry and exit points include, for example, firewalls, electronic mail servers, web servers, proxy servers, remote-access servers, workstations, mobile devices, and notebook/laptop computers. Spam can be transported by different means including, for example, electronic mail, electronic mail attachments, and web accesses. Spam protection mechanisms include, for example, signature definitions.


h3. The organization:

* *SI-8a.*: Employs spam protection mechanisms at information system entry and exit points to detect and take action on unsolicited messages; and
* *SI-8b.*: Updates spam protection mechanisms when new releases are available in accordance with organizational configuration management policy and procedures.


----


h2. *SI-10*: INFORMATION INPUT VALIDATION

Checking the valid syntax and semantics of information system inputs (e.g., character set, length, numerical range, and acceptable values) verifies that inputs match specified definitions for format and content. Software applications typically follow well-defined protocols that use structured messages (i.e., commands or queries) to communicate between software modules or system components. Structured messages can contain raw or unstructured data interspersed with metadata or control information. If software applications use attacker-supplied inputs to construct structured messages without properly encoding such messages, then the attacker could insert malicious commands or special characters that can cause the data to be interpreted as control information or metadata. Consequently, the module or component that receives the tainted output will perform the wrong operations or otherwise interpret the data incorrectly. Prescreening inputs prior to passing to interpreters prevents the content from being unintentionally interpreted as commands. Input validation helps to ensure accurate and correct inputs and prevent attacks such as cross-site scripting and a variety of injection attacks.


h3. The information system checks the validity of [Assignment: organization-defined information inputs].



----


h2. *SI-11*: ERROR HANDLING

Organizations carefully consider the structure/content of error messages. The extent to which information systems are able to identify and handle error conditions is guided by organizational policy and operational requirements. Information that could be exploited by adversaries includes, for example, erroneous logon attempts with passwords entered by mistake as the username, mission/business information that can be derived from (if not stated explicitly by) information recorded, and personal information such as account numbers, social security numbers, and credit card numbers. In addition, error messages may provide a covert channel for transmitting information.


h3. The information system:

* *SI-11a.*: Generates error messages that provide information necessary for corrective actions without revealing information that could be exploited by adversaries; and
* *SI-11b.*: Reveals error messages only to [Assignment: organization-defined personnel or roles].


----


h2. *SI-12*: INFORMATION HANDLING AND RETENTION

Information handling and retention requirements cover the full life cycle of information, in some cases extending beyond the disposal of information systems. The National Archives and Records Administration provides guidance on records retention.


h3. The organization handles and retains information within the information system and information output from the system in accordance with applicable federal laws, Executive Orders, directives, policies, regulations, standards, and operational requirements.



----


h2. *SI-13*: PREDICTABLE FAILURE PREVENTION

While MTTF is primarily a reliability issue, this control addresses potential failures of specific information system components that provide security capability. Failure rates reflect installation-specific consideration, not industry-average. Organizations define criteria for substitution of information system components based on MTTF value with consideration for resulting potential harm from component failures. Transfer of responsibilities between active and standby components does not compromise safety, operational readiness, or security capability (e.g., preservation of state variables). Standby components remain available at all times except for maintenance issues or recovery failures in progress.


h3. The organization:

* *SI-13a.*: Determines mean time to failure (MTTF) for [Assignment: organization-defined information system components] in specific environments of operation; and
* *SI-13b.*: Provides substitute information system components and a means to exchange active and standby components at [Assignment: organization-defined MTTF substitution criteria].


----


h2. *SI-14*: NON-PERSISTENCE

This control mitigates risk from advanced persistent threats (APTs) by significantly reducing the targeting capability of adversaries (i.e., window of opportunity and available attack surface) to initiate and complete cyber attacks. By implementing the concept of non-persistence for selected information system components, organizations can provide a known state computing resource for a specific period of time that does not give adversaries sufficient time on target to exploit vulnerabilities in organizational information systems and the environments in which those systems operate. Since the advanced persistent threat is a high-end threat with regard to capability, intent, and targeting, organizations assume that over an extended period of time, a percentage of cyber attacks will be successful. Non-persistent information system components and services are activated as required using protected information and terminated periodically or upon the end of sessions. Non-persistence increases the work factor of adversaries in attempting to compromise or breach organizational information systems.
Non-persistent system components can be implemented, for example, by periodically re-imaging components or by using a variety of common virtualization techniques. Non-persistent services can be implemented using virtualization techniques as part of virtual machines or as new instances of processes on physical machines (either persistent or non-persistent).The benefit of periodic refreshes of information system components/services is that it does not require organizations to first determine whether compromises of components or services have occurred (something that may often be difficult for organizations to determine). The refresh of selected information system components and services occurs with sufficient frequency to prevent the spread or intended impact of attacks, but not with such frequency that it makes the information system unstable. In some instances, refreshes of critical components and services may be done periodically in order to hinder the ability of adversaries to exploit optimum windows of vulnerabilities.


h3. The organization implements non-persistent [Assignment: organization-defined information system components and services] that are initiated in a known state and terminated [Selection (one or more): upon end of session of use; periodically at [Assignment: organization-defined frequency]].



----


h2. *SI-15*: INFORMATION OUTPUT FILTERING

Certain types of cyber attacks (e.g., SQL injections) produce output results that are unexpected or inconsistent with the output results that would normally be expected from software programs or applications. This control enhancement focuses on detecting extraneous content, preventing such extraneous content from being displayed, and alerting monitoring tools that anomalous behavior has been discovered.


h3. The information system validates information output from [Assignment: organization-defined software programs and/or applications] to ensure that the information is consistent with the expected content.



----


h2. *SI-16*: MEMORY PROTECTION

Some adversaries launch attacks with the intent of executing code in non-executable regions of memory or in memory locations that are prohibited. Security safeguards employed to protect memory include, for example, data execution prevention and address space layout randomization. Data execution prevention safeguards can either be hardware-enforced or software-enforced with hardware providing the greater strength of mechanism.


h3. The information system implements [Assignment: organization-defined security safeguards] to protect its memory from unauthorized code execution.



----


h2. *SI-17*: FAIL-SAFE PROCEDURES

Failure conditions include, for example, loss of communications among critical system components or between system components and operational facilities. Fail-safe procedures include, for example, alerting operator personnel and providing specific instructions on subsequent steps to take (e.g., do nothing, reestablish system settings, shut down processes, restart the system, or contact designated organizational personnel).


h3. The information system implements [Assignment: organization-defined fail-safe procedures] when [Assignment: organization-defined failure conditions occur].

